import React, { useState , useEffect} from 'react';
import './Dashboard.css'; // Import your CSS file for styling
import  menlogo  from "../Icons/men_logo.jpg"
import { FileUpload } from 'primereact/fileupload';
import clickJob from "../Icons/Finding_a_job.png"
import { getJobs } from '../Service/api-service';

function Dashboard() {

  const [jobs, setJobs] = useState([ 
  ]);
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationSent, setApplicationSent] = useState(false);

  useEffect(() => {
    getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
      });
  }, []);


    const customBase64Uploader = async (event) => {

        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
    };

        

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setApplicationSent(false); 
  };

  const handleSendApplication = () => {
    setApplicationSent(true);
    setTimeout(() => {
      setSelectedJob(null);
      setApplicationSent(false); 
    }, 5000);
  };


  return (
   <div className='dashboard'>
   
    <div className='sidebar'>
    <img src={menlogo}></img>
    </div>
    
    <div className='centrebar'>
  <span className='heading'>Job Board</span>

  <div className='Job-head'>
    {jobs.map((job) => (
      <div key={job._id} className='jobcard'>
        <div className='left-div'>
          <span>{job.title}</span>
          <span>{job.company}</span>
          <span>{job.location}</span>
        </div>
        <div className='right-div'>
          <span>{job.salary}</span>
          <button   className='apply-button'  onClick={() => handleJobClick(job)} >Apply</button>
        </div>
      </div>
    ))}
  </div>

</div>
 
  

    <div class="rightsidebar">

    {selectedJob ? ( 
    <div className='job-apply-detail'>
      <span className='static-text'>Job Description<span>*</span></span>
      <p>{selectedJob?.description}</p>
      <span className='static-text'>Send your application<span>*</span></span>
      <span className='static-text'>Name<span>*</span></span>
      <input className='user-input'></input>
      <span className='static-text'>Mobile No.<span>*</span></span>
      <input className='user-input'></input>
      <span className='static-text'>Email Id<span>*</span></span>
      <input className='user-input'></input>
      <span className='static-text'>Resume<span>*</span></span>
      <div className='file-upload'>
        <span>Choose Your File</span>
        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload uploadHandler={customBase64Uploader} chooseLabel='Browse' />
      </div>

      <div className='button-container'>
        <button className='cancel-button'onClick={() => setSelectedJob(null)}>Cancel</button>
        <button
            className={`send-button${applicationSent ? '-disabled' : ''}`}
            onClick={handleSendApplication}
            disabled={applicationSent} 
          >
            {applicationSent ? 'Application Sent' : 'Send Application'}
          </button>
      </div>
    </div>
  ) : (

    <div className='alternative-content'>
      <img src={clickJob}></img>
    </div>
  )}

    </div>

   </div>
  );
}

export default Dashboard;
