import styled from 'styled-components';

export const ContactItem = styled.li`
  padding: 2px 20px;
  font-weight: 600;
  display: flex;
  align-items: center;

  :nth-child(even) {
 background-color: #d8e8ee;
`;

export const ContactNumber = styled.a`
  padding: 0 20px;
  font-weight: 500;
  color: #2f2d2d;
  text-decoration: none;
`;

export const FilterButton = styled.button`
  margin-left: auto;
  width: 100px;
  height: 25px;
  border-radius: 4px;
  border: transparent;
  color: #fff;
  background-color: #4f8bba;
  font-weight: 700;
`;
