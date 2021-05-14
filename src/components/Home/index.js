import React,{useState, useEffect} from 'react'
import './style.css'
import Header from "./../Header";
import FormSelect from './../forms/FormSelect';
import {db,auth} from "./../firebase";
import Ongoing from "./../Ongoing";
import Research from "./../Research";
import {Link} from "react-router-dom";
import Books from "./../Books";
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom"

function Home() {

  const history = useHistory('');



  const [user, setUser] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(false);
      }
    })
  }, [])
  if(user === false){
      history.push("/login");
  }
 

    const [field, setField] = useState("");
    const [field1, setField1] = useState("");

    const [topic, setTopic] = useState("");
    const [topic1, setTopic1] = useState("");

    const [location, setLocation] = useState("");
    const [location1, setLocation1] = useState("");

    const [max, setMax] = useState("");
    const [min, setMin] = useState("");
    const [fieldBook, setFieldBook] = useState("");
    const [book, setBook] = useState("");


    const postBook = (event) =>{
      event.preventDefault();
      let errors = {}

      if(!fieldBook.trim()){
        errors.fieldBook = alert('Academic Field is required');
      }else if(!/^[A-Za-z0-9]+/.test(fieldBook.trim())){
        errors.fieldBook = alert('Enter a valid academic field');

      }else if(!book.trim()){
        errors.book = alert('Book Field is required');
      }else if(!/^[A-Za-z0-9]+/.test(book.trim())){
        errors.book = alert('Enter a valid academic field book');

      }else{
        db.collection("books").add({
          timestamp:  Date.now(),
          field:fieldBook,
          book:book,
        })
        setFieldBook("");
        setBook("");
      }
    }

   
    const postForm = (event) => {
        event.preventDefault();
        let errors = {};

    if (!field.trim()) {
        errors.field = alert('Academic Field is required');
      } else if (!/^[A-Za-z0-9]+/.test(field.trim())) {
          errors.field = alert('Enter a valid academic field');
      }else if(!topic.trim()){
        errors.topic = alert('Topic of the selected Field is required');
    
    } else if (!/^[a-zA-Z0-9]+/.test(topic.trim())) {
        errors.topic = alert('Enter a valid topic');
    
  }else{
  

        db.collection('forms').add({
            //
          timestamp:  Date.now(),
          ownerPhotoURL: user?.photoURL,
          ownerDisplayName: user?.displayName,
          ownerEmail:user?.email,
          ownerId:user?.uid,
              read: false,
              read1:false,
              topic: topic,
              topic1: topic1,   
              field: field,
              field1:field1,
              location:location,
              location1:location1,
              max:max,
              min:min,
     
        }).then(ref => alert("Survey Form submitted successfully"))
        setField("");
        setTopic("");
        setField1("");
        setTopic1("");

    }
}

const postForm1 = (event) => {
  event.preventDefault();
  let errors = {};

if (!field.trim()) {
  errors.field = alert('Academic Field is required');
} else if (!/^[A-Za-z0-9]+/.test(field.trim())) {
    errors.field = alert('Enter a valid academic field');
} else if (!field1.trim()) {
  errors.field1 = alert('Academic Field is required');
} else if (!/^[A-Za-z0-9]+/.test(field1.trim())) {
    errors.field1 = alert('Enter a valid academic field');
}


}

const postForm2 = (event) => {
  event.preventDefault();
  let errors = {};

if (!topic.trim()) {
  errors.topic = alert('Topic of the Field selected is required');
} else if (!/^[A-Za-z0-9]+/.test(topic.trim())) {
    errors.topic = alert('Enter a valid academic field');
} else if (!topic1.trim()) {
  errors.topic1 = alert('Topic of the Field selected is required');
} else if (!/^[A-Za-z0-9]+/.test(topic1.trim())) {
    errors.topic1 = alert('Enter a valid Topic field');
}


}
    return (
        <div>
            <Header user={user}/>
            <div style={{justifyContent: "space-between",marginTop: "100px",paddingLeft: "10px"}} className="">
            <button style={{marginRight: "10px",marginTop: "50px",background: "#FE2E9A"}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Start New Survey</button>
            <Link to="/allforms">
            <button style={{marginRight: "10px",marginTop: "50px",background: "#FE2E9A"}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" data-whatever="@fat">Ongoing Surveys</button>

            </Link>
            <Link to="/findings">
            <button style={{marginRight: "10px",marginTop: "50px",background: "#FE2E9A"}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3" data-whatever="@getbootstrap">Research findings</button>

            </Link>
<button style={{marginRight: "10px",marginTop: "50px",background: "#FE2E9A"}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal20" data-whatever="@mdo">Recommended Books</button>
{/* <button style={{marginRight: "10px",marginTop: "50px",background: "#FE2E9A"}}  type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Buy Research audience</button> */}
            </div>


<div  class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div class="modal-header">
        <h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel">a. Which academic field are you interested in researching on?</h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">
            <FormSelect style={{color: "#FE2E9A"}}
                        
                        
                        label=""
                         
                         options={[{
                           value: "",
                           name: "Select Academic Fields"
                         },
                         {
                           value: "Civil Engineering",
                           name: "Civil Engineering"
                         }, {
                           value: "Zoology",
                           name: "Zoology"
                         }, {
                           value: "Biochemistry and Industry",
                           name: "Biochemistry and Industry"
                         }, {
                            value: "other",
                            
                            name: "other"
                          }]} 
                         required=""             onChange={(e) => setField(e.target.value)} type="text" 
                       />
            </label>
            {field==="other" &&(
              <input type="text" class="form-control" id="recipient-name" onChange={(e) => {
                                setField1(e.target.value)
                            }}  placeholder="If Other Specify the Field"/>
            )}
            
          </div>
          
        </form>
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        {field &&(
        <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#exampleModal1" data-whatever="@fat"  style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Next</button>

        )}
        {!field &&(
        <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat" onClick={postForm1}    style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Next</button>

        )}
      </div>
    </div>
  </div>
</div>
<div  class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div class="modal-header">
        <h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel">b. Which topic in  "{field}" would you like to conduct your research on?</h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">
            <FormSelect style={{color: "#FE2E9A"}}
                        
                        
                        label=""
                         
                         options={[{
                           value: "",
                           name: "Select Topic"
                         },
                         {
                           value: "Completion Period",
                           name: "Completion Period"
                         }, {
                           value: "Attachment Number",
                           name: "Attachment(s) Number"
                         }, {
                           value: "Avarage Perfomance",
                           name: "Avarage Perfomance"
                         }, {
                            value: "other",
                            
                            name: "other"
                          }]} 
                         required=""             onChange={(e) => setTopic(e.target.value)} type="text" 
                       />
            </label>
            {topic==="other" &&(
              <input type="text" class="form-control" id="recipient-name" onChange={(e) => {
                                setTopic1(e.target.value)
                            }}  placeholder="If Other Specify the Topic"/>
            )}
          </div>
          
        </form>
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#exampleModal21" data-whatever="@fat" style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Buy Research audience (Optional)</button>

        <button type="button" onClick={postForm}  data-toggle="modal" data-dismiss="modal" data-target="#exampleModal1" data-whatever="@fat" style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>
<div  class="modal fade" id="" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
  <Ongoing user={user}/>
</div>

<div  class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <Research />
</div>


<div  class="modal fade" id="exampleModal20" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div style={{justifyContent: ""}}>
      <input type="text" class="" id="recipient-name" onChange={(e) => {
                                setFieldBook(e.target.value)
                            }}  placeholder="Enter Academic Field"/>     
                            
                            <input type="text" class="" id="recipient-name" onChange={(e) => {
                                setBook(e.target.value)
                            }}  placeholder="Enter Field Book"/>      </div>
   <Button style={{color: "#FE2E9A"}} onClick={postBook} variant="contained">Add</Button>

      <div class="modal-header">

        <h5 style={{color: "white"}} class="modal-title" id="">Recommended Books</h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
<>


  
<Books />
</>
      
    </div>
  </div>
</div>






<div  class="modal fade" id="exampleModal21" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div class="modal-header">
        <h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel">Which location(city) are you interested in researching on?</h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">
            <FormSelect style={{color: "#FE2E9A"}}
                        
                        
                        label=""
                         
                         options={[{
                           value: "",
                           name: "Select Location"
                         },
                         {
                           value: "Nairobi",
                           name: "Nairobi"
                         }, {
                           value: "Mombasa",
                           name: "Mombasa"
                         }, {
                           value: "Nakuru",
                           name: "Nakuru"
                         }, {
                            value: "other",
                            
                            name: "other"
                          }]} 
                         required=""             onChange={(e) => setLocation(e.target.value)} type="text" 
                       />
            </label>
            {location==="other" &&(
              <input type="text" class="form-control" id="recipient-name" onChange={(e) => {
                setLocation1(e.target.value)
                            }}  placeholder="If Other Specify the location"/>
            )}
            
          </div>
          
        </form>
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        {field &&(
        <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#exampleModal22" data-whatever="@fat"  style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Next</button>

        )}
        {!field &&(
        <button type="button" data-dismiss="modal" data-toggle="modal" data-target="" data-whatever="@fat" onClick={postForm1}    style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Next</button>

        )}
      </div>
    </div>
  </div>
</div>


<div  class="modal fade" id="exampleModal22" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div class="modal-header">
        <h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel">Which age(limit) are you interested in researching on?</h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">
              <div style={{justifyContent: "space-between",display: "flex",alignContent:"center"}}>
              <FormSelect style={{color: "#FE2E9A"}}
                        
                        
                         
                         options={[{
                           value: "",
                           name: "Min. Age"
                         },
                         {
                           value: "20",
                           name: "20"
                         }, {
                           value: "21",
                           name: "21"
                         }, {
                           value: "22",
                           name: "22"
                         }, {
                            value: "23",
                            
                            name: "23"
                          }, {
                            value: "24",
                            
                            name: "24"
                          }, {
                            value: "25",
                            
                            name: "25"
                          }]} 
                         required=""             onChange={(e) => setMin(e.target.value)} type="text" 
                       />

<FormSelect style={{color: "#FE2E9A"}}
                        
                        
                         
                         options={[{
                           value: "",
                           name: "Max. age"
                         },
                         {
                           value: "26",
                           name: "26"
                         }, {
                           value: "27",
                           name: "27"
                         }, {
                           value: "28",
                           name: "28"
                         }, {
                            value: "29",
                            
                            name: "29"
                          }, {
                            value: "30",
                            
                            name: "30"
                          }]} 
                         required=""             onChange={(e) => setMax(e.target.value)} type="text" 
                       />
              </div>
            
            </label>
           
            
          </div>
          
        </form>
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        <button type="button" data-dismiss="modal" data-toggle="modal"  data-whatever="@fat"  style={{background: "white",color: "#FE2E9A"}} onClick={postForm}  class="btn btn-primary">Post</button>

      
      </div>
    </div>
  </div>
</div>

{/* <div  class="modal fade" id="exampleModal23" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div class="modal-header">
        <h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel">Which Religion are you interested in researching on?</h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">
            <FormSelect style={{color: "#FE2E9A"}}
                        
                        
                        label=""
                         
                         options={[{
                           value: "",
                           name: "Select Religoin"
                         },
                         {
                           value: "Christianity",
                           name: "Christianity"
                         }, {
                           value: "Islamic",
                           name: "Islamic"
                         }, {
                           value: "Hindu",
                           name: "Hindu"
                         }, {
                            value: "other",
                            
                            name: "other"
                          }]} 
                         required=""             onChange={(e) => setReligion(e.target.value)} type="text" 
                       />
            </label>
            {religion==="other" &&(
              <input type="text" class="form-control" id="recipient-name" onChange={(e) => {
                                setReligion1(e.target.value)
                            }}  placeholder="If Other Specify the religion"/>
            )}
            
          </div>
          
        </form>
      </div>
      <div class="modal-footer">
       
        <button type="button" data-dismiss="modal" data-toggle="modal"  data-whatever="@fat" onClick={postForm}    style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Post</button>

      </div>
    </div>
  </div>
</div> */}


<div  class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  class="modal-dialog" role="document">
    <div style={{background: "#FE2E9A"}} class="modal-content">
      <div class="modal-header">
        <h5 style={{color: "white"}} class="modal-title" id="exampleModalLabel">a. Which academic field are you interested in researching on?</h5>
        <button style={{color: "white"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span style={{color: "white"}} aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">
            <FormSelect style={{color: "#FE2E9A"}}
                        
                        
                        label=""
                         
                         options={[{
                           value: "",
                           name: "Select Academic Fields"
                         },
                         {
                           value: "Civil Engineering",
                           name: "Civil Engineering"
                         }, {
                           value: "Zoology",
                           name: "Zoology"
                         }, {
                           value: "Biochemistry and Industry",
                           name: "Biochemistry and Industry"
                         }, {
                            value: "other",
                            
                            name: "other"
                          }]} 
                         required=""             onChange={(e) => setField(e.target.value)} type="text" 
                       />
            </label>
            {field==="other" &&(
              <input type="text" class="form-control" id="recipient-name" onChange={(e) => {
                                setField1(e.target.value)
                            }}  placeholder="If Other Specify the Field"/>
            )}
            
          </div>
          
        </form>
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        {field &&(
        <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#exampleModal1" data-whatever="@fat"  style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Next</button>

        )}
        {!field &&(
        <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat" onClick={postForm1}    style={{background: "white",color: "#FE2E9A"}} class="btn btn-primary">Next</button>

        )}
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default Home
