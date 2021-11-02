import React, { useState, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";
import UserCard from "./UserCard";
import { TaskContext } from "../../contexts/TaskContext";

const BodyContainer = styled.div`
  display: flex;
  height: 90%;
  width: 100%;
  background-color: ${(props) => (props.dark ? "#22272D" : "#fff")};
  color: ${(props) => (props.dark ? "#fff" : "#111")};
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: ${(props) => (props.navOpen ? "20%" : "0%")};
  background-color: rgba(0, 0, 0, 0.1);
  transition: all linear 0.2s;
  @media (max-width: 845px) {
    width: ${(props) => (props.navOpen ? "75%" : "0%")};
  }
`;

const ContentContainer = styled.div`=
  height: 100%;
  width: 100%;
  @media (max-width: 845px) {
    width: ${(props) => (props.navOpen ? "25%" : "100%")};
  }   
`;
const NavCardsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: ${(props) => (props.navOpen ? "100%" : "0%")};
  display: ${(props) => !props.navOpen && "none"};
`;
const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: ${(props) => (props.navOpen ? "100%" : "0%")};
  display: ${(props) => !props.navOpen && "none"};
`;

const Body = ({ sidebar, content }) => {
  const { userDB } = useAuth();
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { dark, navOpen, setNavOpen } = useContext(TaskContext);

  const navOutsideClickMobile = () => {
    if (window.innerWidth <= 845 && navOpen) {
      setNavOpen(false);
    }
  };

  userDB
    .doc("profile")
    .get()
    .then((doc) => {
      if (doc.exists) {
        currentUser.updateProfile({ displayName: doc.data().username });
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      setError(error);
    });
  return (
    <BodyContainer dark={dark}>
      <SideBarContainer navOpen={navOpen}>
        {error && <div>Error: {error}</div>}

        <NavCardsContainer navOpen={navOpen}>{sidebar}</NavCardsContainer>
        <UserCardContainer
          navOpen={navOpen}
          onClick={() => {
            if (window.innerWidth <= 845 && navOpen) {
              setNavOpen(!navOpen);
            }
          }}
        >
          <UserCard />
        </UserCardContainer>
      </SideBarContainer>
      <ContentContainer navOpen={navOpen} onClick={navOutsideClickMobile}>
        {content}
      </ContentContainer>
    </BodyContainer>
  );
};

export default Body;
