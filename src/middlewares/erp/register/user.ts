import { NextResponse } from 'next/server';
import { MemberInterface } from 'types/models/member';

const registerUser = async (body: MemberInterface) => {
  if (Object.values(body).some(value => !value)) {
    return Response.json({ success: false, message: 'Missing values' }, { status: 401 });
  }

  return NextResponse.next();
};

export default registerUser;
