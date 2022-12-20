import classNames from 'classnames';
import { CoolGlassProps } from './interface';

const CoolGlass: React.FC<CoolGlassProps> = ({ dark = false, rounded }) => {
  const glassClasses = classNames('absolute inset-0 z-[2]', {
    cool__glass: !dark,
    'cool__glass-dark': dark,
    'rounded-md': rounded,
  });

  return <div className={glassClasses} />;
};

export default CoolGlass;
