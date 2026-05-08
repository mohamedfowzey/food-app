import sadGirl from '../../../assets/sadGirl.svg'

export default function NoData() {
  return (
    <div className='text-center'>
      <img src={sadGirl} alt="No Data" />
      <h1>No Data !</h1>
      <p className='fs-4'>There is no data to display.</p>
    </div>
  )
}
