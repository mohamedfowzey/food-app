import { useContext } from 'react'
import Header from '../../Shared/Header/Header'
import { ContextFounder } from '../../../contexts/UserConrtrxt';
import hraderGirl from "../../../assets/header-grirl.png"

export default function Home() {
  const {user} = useContext(ContextFounder);
  return (<>  
          <Header image={hraderGirl} title={`Welcome, ${user?.userName}`} description="This is a welcoming screen for the entry of the application , you can now see the options" />
          </>
  )
}
