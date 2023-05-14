import { observer } from "mobx-react-lite";
import {Form, Formik } from "formik";
import { Button,Grid, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import MySelectInput from "../../app/common/form/MySelectInput";
import CryptoJS from "crypto-js";

const algorithmOptios=[
    {text:"AES" ,value:"aes"},
    {text:"OTS" ,value:"ots"},
    {text:"3DES" ,value:"3des"},
]

interface Datas {
    message:string,
    key:string,
    decrypted:string,
    encrypted:string,
    algorithm:string
}
export default observer(function EncriptionForm(){

    const HandleEncrypt = (values:Datas)=>{
    const message = values.message;
        const key = values.key;
        const algorithm = values.algorithm;

        if (algorithm === "aes") {
            values.encrypted = CryptoJS.AES.encrypt(message, key).toString();
        }
        else if (algorithm === "ots") 
        {
            if (values.key.length !== values.message.length){
                alert(`Key is ${Math.abs(values.key.length - values.message.length) } ${ values.key.length < values.message.length?"shorter" :"taller"} than the message but it should be equal in OTS`)
            }
            else{
                var plaintext = values.message
                var encrypted = [];
                for (let i = 0; i< plaintext.length; i++){
                    const plaintextChar = plaintext.charCodeAt(i);
                    const keychar = key.charCodeAt(i);
                    var encryptedChar = plaintextChar^keychar;
                    encrypted.push(String.fromCharCode(encryptedChar))
                }
                values.encrypted = encrypted.join("")
            }
        } 
        else if (algorithm === "3des") 
        {
            values.encrypted = CryptoJS.TripleDES.encrypt(message, key).toString();
        }
    }

    function HandleDecrypt(values:Datas){
        const cipher = values.encrypted;
        const key = values.key;
        const algorithm = values.algorithm;
  
        if (algorithm === "aes") {
            values.decrypted = CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
        } 
        else if (algorithm === "ots") 
        {
            if (values.key.length !== values.encrypted.length){
                alert(`Key is ${Math.abs(values.key.length - values.message.length) } ${ values.key.length < values.message.length?"shorter" :"taller"} than the Cipher text but it should be equal in OTS`)
            }
            else{
                let decryptedText = [];
                for( let i=0 ;i < values.encrypted.length; i++){
                    const chiphertextChar = values.encrypted.charCodeAt(i);
                    const keyChar = values.key.charCodeAt(i);
                    const decryptedChar = chiphertextChar ^ keyChar
                    decryptedText.push(String.fromCharCode(decryptedChar));
                }
                values.decrypted = decryptedText.join("")
            }
        }
        else if (algorithm === "3des") 
        {
              values.decrypted = CryptoJS.TripleDES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
        }
    }
    

    return (
        <Formik 
        initialValues={{message:"",key:"",decrypted: "",encrypted:"",algorithm:""}}
        onSubmit={()=>{}}
        >
            {({handleSubmit,values})=>(
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' style={{marginTop:"20%"}}>
                    
                    <Grid centered>
                
                        <Header as="h2" content="Encryption and Decryption" color='teal' textAlign='center' />
                        
                        <Grid.Row columns={2} >
                            <Grid.Column>
                                <MyTextInput placeholder='Key' name='key'  />
                            </Grid.Column>
                            <Grid.Column >
                                <MySelectInput options={algorithmOptios} placeholder='Algorithm' name='algorithm'  />
                            </Grid.Column>
                        </Grid.Row>
                      
                        <Grid.Column width={"10"}>
                            <Grid.Row>
                            <MyTextArea rows={8}  placeholder='Message' name='message'/>
                            </Grid.Row>
                        </Grid.Column>
                            
                        <Grid.Row>
                            <Grid.Column style={{width:"50%"}}>
                                <Button onClick={()=>HandleEncrypt(values)} positive content='Encrypt' />
                                <MyTextArea rows={10} placeholder='Encrypted message'  name='encrypted'/>
                            </Grid.Column>
                            <Grid.Column style={{width:"50%"}}>
                                <Button  onClick={()=>HandleDecrypt(values)} positive content='Decrypt' />
                                <MyTextArea rows={10}  placeholder='Decrytped message' name='decrypted'/>
                            </Grid.Column>
                        </Grid.Row>
                            
                    </Grid>
                   
                </Form>
            )}

        </Formik>
    )
});