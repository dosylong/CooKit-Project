import { Flex } from '@chakra-ui/react';
import { Step, Steps } from 'chakra-ui-steps';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const steps = [
  { label: 'Account', icon: AiOutlineUser },
  { label: 'Information', icon: AiOutlineInfoCircle },
];

export default function CustomStep(props) {
  const { activeStep } = props;

  return (
    <Flex flexDir='column' width='100%'>
      <Steps activeStep={activeStep}>
        {steps.map(({ label, icon }) => (
          <Step label={label} key={label} icon={icon} />
        ))}
      </Steps>
    </Flex>
  );
}
