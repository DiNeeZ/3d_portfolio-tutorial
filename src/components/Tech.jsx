import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { convertToKebabCase } from '../utils/helpers';

const Tech = () => {
  return (
    <ul className='flex flex-wrap justify-center gap-10'>
      {technologies.map((tech) => (
        <div
          key={convertToKebabCase(tech.name)}
          className='w-28 h-28'>
          <BallCanvas icon={tech.icon} />
        </div>
      ))}
    </ul>
  );
};

export default SectionWrapper(Tech, '');
