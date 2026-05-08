import { ContextFounder } from '../../../contexts/UserConrtrxt';

export default function Header({title,description,image}) {
  const [firstWord, ...rest] = title.split(' ');
  const restOfTitle = rest.join(' ');
  return (
    <div className='bg-header my-3 rounded-4 container'>
      <div className="row">
        <div className="col-md-7 align-self-center ps-4" >
          <h1>{firstWord} <span className='fw-normal fs-2'>{restOfTitle}</span></h1>
          <p>{description}</p>
        </div>
        <div className="col-md-5 text-end"><img className='img-fluid' src={image} alt="" /></div>
      </div>
    </div>
  )
}
