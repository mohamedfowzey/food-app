import { useContext } from 'react'
import Header from '../../Shared/Header/Header'
import { ContextFounder } from '../../../contexts/UserConrtrxt';
import hraderGirl from "../../../assets/header-grirl.png"
import MainButton from '../../Shared/MainButton/MainButton';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const {user} = useContext(ContextFounder);
  const navigate = useNavigate();
  return (<>  
          <Header image={hraderGirl} title={`Welcome, ${user?.userName}`} description="This is a welcoming screen for the entry of the application , you can now see the options" />
          <div className="container rounded-4 p-3 ps-4 bg-light-accent">
            <div className="row align-items-center">
              <div className="heading col-md-6">
                <h3>Fill The <span className="text-accent">Recipes</span>!</h3>
                <p className="text-ternary">
                  you can now fill the meals easily using the table and form , click here and sill it with the table !
                </p>
              </div>
              <div className="col-md-6 text-end">
                <div className=" d-inline-block" onClick={()=>navigate('add-recipe')}><MainButton>Fill Recipes <i className='fa fa-arrow-right'></i></MainButton></div>
              </div>
            </div>
          </div>
          </>
  )
}
