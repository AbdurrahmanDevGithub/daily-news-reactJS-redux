import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToNewsLetter } from "../../store/utils/thunk";
import { ShowToast } from "./tools";
import { clearNewsLetter } from "../../store/reducers/users";

const NewsLetter = () => {
  const textInput = useRef();
  const dispatch=useDispatch()

  const handleSubmit=(e)=>{
    e.preventDefault();
    const value = textInput.current.value;
   
    dispatch(addToNewsLetter({email:value}))
    .unwrap()
    .then(response=>{
      if(response.newsLetter==='added'){
        ShowToast('SUCCESS','thank you !!!')
      }
      if(response.newsLetter==='failed'){
        ShowToast('ERROR','sorry, already in the DB')
      }
      textInput.current.value=''
      dispatch(clearNewsLetter())
    })
    
  }

  return (
    <>
      <div className="newsletter_container">
        <h1>newsletter</h1>
        <div className="form">
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="example@gmail.com"
                name="email"
                ref={textInput}
              />
            </Form.Group>
            <Button className="mt-2" variant="primary" type="submit">
              Add me to the list
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
