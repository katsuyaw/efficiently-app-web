import styled from "styled-components";
export const Container = styled.div`
  height: 100vh;
  width: auto;
`;

export const HeaderContainer = styled.div`
  height: 10%;
  width: 100wh;
  background-color: #46bcff;
  display: flex;
  align-items: center;
`;

export const TopLogoContainer = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  alitgn-items: cetner;
`;

export const TitleContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  alitgn-items: cetner;
  font-size: 1.5em;
`;

export const TopTitleWrapper = styled.div`
  display: flex;
`;
export const SearchContainer = styled.div`
  width: 70%;
  display: flex;
`;

export const TopSearchForm = styled.div`
  width 100%;
  height: auto;
  display: flex;
  margin: 0 3rem;
`;

export const TopSearchInput = styled.input`
  width: 100%;
  height: 3rem;
  border: 0.1rem solid #efefef;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  margin: 0 1rem 0 1rem;
  text-align: center;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2rem #94d9ff;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  height: 90%;
`;

export const BodyContainer = styled.div`
  width: 70%;
  height: 100%;
  position: relative;
`;

export const SideBarContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: #fafafa;
  padding: 0.5rem 0;
`;

export const SideSectionWrapper = styled.div`
  height: 2rem;
  width: auto;
  background-color: #fff;
  margin: 1rem;
  display: flex;
  align-items: center;
`;

export const SectionIcon = styled.div`
  width: 10%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
`;
export const SectionName = styled.div`
  display: flex;
  width: 90%;
  padding: 1rem;
`;

export const MainTitleContainer = styled.div`
  height: 5%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  background-color: blue;
`;

export const TaskListContainer = styled.div`
  height: 85%;
  overflow-y: auto;
`;

export const TaskInputContainer = styled.form`
  width: 100%;
  height: 20%
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  padding: 1rem 2rem;
`;

//Task.js

export const Checkbox = styled.input`
  margin: 1rem;
`;

export const TaskContainer = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0.1rem solid #f1f1f1;
  border-radius: 0.5rem;
  background-color: #efefef;
  margin: 1.5rem 3rem;
  padding: 0.1rem;
  position: relative;
`;

export const OptionContainer = styled.button`
  position: absolute;
  right: 1rem;
  display: flex;
`;

export const EditInput = styled.input`
  background-color: #efefef;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const TaskTitleContainer = styled.div`
  width: 70%;
`;

export const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6em;
`;
