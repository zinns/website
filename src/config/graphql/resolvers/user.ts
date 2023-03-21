import otpGenerator from 'otp-generator';
import Twilio from 'twilio';
import i18next from 'i18next';
import { User } from 'config/db/models';
import { createToken, verifyToken } from 'utils/jwt';
import { AuthenticateInputType, NewUserInputType } from 'types/resolvers';
import { userExists } from 'utils/db';
import { generateHash, generateSalt, isHashCorrect } from 'utils/pwd';
import { JWTUserType } from 'types/jwt';

const KEY = process.env.JWT_KEY ?? '';

export const userResolvers = {
  Query: {
    getUser: async (_: unknown, { input: { token } }: { input: { token: string } }) => {
      try {
        const validToken: JWTUserType | null = verifyToken(token) as JWTUserType | null;

        if (validToken) {
          const user = await User.findById(validToken.id);

          return {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            phone: user.phone,
            role: user.role,
          };
        }

        return {
          message: ['authentication.invalidToken'],
        };
      } catch (error) {
        console.log(error);
        return {
          message: ['error'],
        };
      }
    },
    getAllUsers: async (_: unknown, { input: { token } }: { input: { token: string } }) => {
      try {
        const validToken: JWTUserType | null = verifyToken(token) as JWTUserType | null;

        if (validToken) {
          const users = await User.find({
            _id: { $ne: validToken.id },
            status: { $ne: 'deleted' },
          });

          return users;
        }

        return {
          message: ['authentication.invalidToken'],
        };
      } catch (error) {
        console.log(error);
        return {
          message: ['error'],
        };
      }
    },
    getAUser: async (_: unknown, { input: { id } }: { input: { id: string } }) => {
      try {
        const user = await User.findById(id);

        if (user) {
          return {
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            phone: user.phone,
          };
        }

        return {
          message: ['modal.activeAccount.errors.notFound'],
        };
      } catch (error) {
        console.log(error);
        return {
          message: ['error'],
        };
      }
    },
  },
  Mutation: {
    newUser: async (_: unknown, { input }: { input: NewUserInputType }) => {
      const { username, phone, password } = input;

      const exist = await userExists(false, { username, phone });

      if (exist) {
        return {
          message: ['modal.invite.repeatedIdentifier'],
        };
      }

      const salt = await generateSalt();
      input.password = await generateHash(password, salt);
      const code = otpGenerator.generate(6, { specialChars: false });

      try {
        const inputTrimmed = { ...input };
        inputTrimmed.phone.trim();
        inputTrimmed.lastName.trim();
        inputTrimmed.name.trim();
        inputTrimmed.username.trim();

        const user = new User({
          ...input,
          verificationCode: `${code}-${inputTrimmed.name}-${inputTrimmed.lastName}`,
        });
        await user.save();

        const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        await client.messages.create({
          body: `${i18next.t('modal.invite.sms.start')} ${code}. ${i18next.t(
            'modal.invite.sms.end',
          )}`,
          messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
          to: inputTrimmed.phone,
        });

        return {
          message: ['modal.invite.created'],
        };
      } catch (error) {
        console.log(error);
        return {
          message: ['error'],
        };
      }
    },
    authenticate: async (_: unknown, { input }: { input: AuthenticateInputType }) => {
      try {
        const { identifier, password } = input;

        const user = await userExists(true, { identifier });

        if (!user) {
          return {
            message: ['login.errors.badCredentials'],
          };
        }
        const correctPassword = await isHashCorrect(password, user.password);

        if (!correctPassword) {
          return {
            message: ['login.errors.badCredentials'],
          };
        }
        return {
          token: createToken({ username: user._doc.username, id: user._id }, KEY, '24h'),
        };
      } catch (error) {
        console.log(error);
        return {
          message: ['error'],
        };
      }
    },
    activeAccount: async (
      _: unknown,
      {
        input: { code, name, lastName },
      }: { input: { code: string; name: string; lastName: string } },
    ) => {
      try {
        const codeExists = await User.findOne({
          verificationCode: `${code.trim()}-${name.trim()}-${lastName.trim()}`,
        });

        if (codeExists && (codeExists.status === 'inactive' || codeExists.status === 'deleted')) {
          await User.updateOne({ id: codeExists.id }, { status: 'active' });

          return {
            id: codeExists._id,
          };
        }

        if (codeExists && codeExists.status === 'active') {
          return {
            message: ['verification.errors.usedCode', 'verification.requestCode'],
          };
        }
        if (!codeExists) {
          return {
            message: ['verification.errors.noCode', 'verification.moreInfo'],
          };
        }
      } catch (error) {
        console.log(error);
        return {
          message: ['error'],
        };
      }
    },
    updateAccount: async (
      _: unknown,
      {
        input: { id, name, lastName, phone, username, password, newAccount },
      }: {
        input: {
          id: string;
          name: string;
          lastName: string;
          phone: string;
          username: string;
          password: string;
          newAccount: boolean;
        };
      },
    ) => {
      try {
        let newPassword: string | null = null;

        if (newAccount) {
          const salt = await generateSalt();
          newPassword = await generateHash(password, salt);
        }

        const findUser = await User.findById(id);

        if (!findUser) {
          return {
            message: [''],
          };
        }

        if (!newAccount) {
          const isAuth = await isHashCorrect(password, findUser.password);

          if (!isAuth) {
            return {
              message: [''],
            };
          }
        }

        const updatedUser = await User.findByIdAndUpdate(
          id,
          {
            name: name,
            lastName: lastName,
            phone: phone,
            username: username,
            ...(newAccount && { status: 'active' }),
            ...(newPassword && { password: newPassword }),
          },
          { new: true },
        );

        return {
          token: createToken({ username, id }, KEY, '24h'),
          ...(!newAccount && {
            id: updatedUser._id,
            name: updatedUser.name,
            lastName: updatedUser.lastName,
            username: updatedUser.username,
            phone: updatedUser.phone,
            role: updatedUser.role,
          }),
        };
      } catch (error) {
        console.log(error);
        return {
          message: ['error'],
        };
      }
    },
    updatePassword: async (
      _: unknown,
      {
        input: { id, oldPassword, newPassword, isRecovering, code },
      }: {
        input: {
          id: string;
          oldPassword: string;
          newPassword: string;
          isRecovering: boolean;
          code: string;
        };
      },
    ) => {
      try {
        let newPasswordHashed;
        const findUser = await User.findById(id);
        let isAuth;

        if (!isRecovering) {
          isAuth = await isHashCorrect(oldPassword, findUser.password);
        }

        const formattedCode = `${code}-${findUser.name}-${findUser.lastName}`;

        if (isRecovering && findUser.verificationCode !== formattedCode) {
          return {
            message: ['modal.forgot.error.code'],
          };
        }

        if (isAuth || isRecovering) {
          const salt = await generateSalt();
          newPasswordHashed = await generateHash(newPassword, salt);
        }

        const userUpdated = await User.findByIdAndUpdate(
          id,
          { password: newPasswordHashed },
          { new: true },
        );

        return {
          token: createToken({ username: userUpdated.username, id }, KEY, '24h'),
        };
      } catch (error) {
        console.log(error);
        return {
          message: ['error'],
        };
      }
    },
    forgotPassword: async (
      _: unknown,
      {
        input: { identifier, phone },
      }: {
        input: {
          identifier: string;
          phone: string;
        };
      },
    ) => {
      try {
        const findUser = await User.findOne({ username: identifier });

        if (!findUser || findUser.phone !== phone) {
          return {
            success: false,
            message: ['modal.invite.repeatedIdentifier'],
            id: null,
          };
        } else {
          const code = otpGenerator.generate(6, { specialChars: false });

          await User.findByIdAndUpdate(
            findUser.id,
            {
              verificationCode: `${code}-${findUser.name}-${findUser.lastName}`,
            },
            { new: true },
          );

          const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

          await client.messages.create({
            body: `This is your new verification code: ${code}.`,
            messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
            to: findUser.phone,
          });

          return {
            success: true,
            message: ['modal.forgot.success'],
            id: findUser._id,
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: ['error'],
        };
      }
    },
    deleteUser: async (
      _: unknown,
      {
        input: { id },
      }: {
        input: {
          id: string;
        };
      },
    ) => {
      try {
        await User.findByIdAndUpdate(id, {
          status: 'deleted',
        });

        return {
          id,
          success: true,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: ['error'],
        };
      }
    },
  },
};
