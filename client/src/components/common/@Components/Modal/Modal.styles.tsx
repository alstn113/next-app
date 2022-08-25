import mediaQuery from '@/lib/styles/mediaQuery';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const Positioner = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
`;

export const ModalBlock = styled(motion.div)`
  background: white;
  width: 25rem;
  background: white;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  ${mediaQuery.sm} {
    width: 15rem;
  }
`;

export const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 700;
`;
export const Message = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Footer = styled.section`
  display: flex;
  gap: 10px;
  margin-top: 2rem;
  justify-content: flex-end;
`;
