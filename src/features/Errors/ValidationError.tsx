import { Message, MessageList } from "semantic-ui-react";

interface Props{
    errors:any;
}
export default function ValidationError({errors}:Props){
    return (
        <Message error>
            {errors&& (
                <MessageList>
                    
                        <Message.Item > {errors.message}</Message.Item>
                   
                </MessageList>
            )}
        </Message>
    )
}