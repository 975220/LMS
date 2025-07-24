import { Webhook } from "svix";
import User from "../modules/User";

// Api controllers Function to manage clerk User with database 

export const clerkWebboks = async () => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"], 
            "svix-timestamp": req.headers[ "svix-timestamp"],
            "svix-signature": req.headers[ "svix-signature"]
        })

        const {data, type} = req.body 

        switch (type) {
            case 'user.created': {
                const UserData = {
                    _id: data.id,
                    email : data.email_address[0].email_address,
                    name: data.first_name + " " + data.last_name, 
                    imageUrl: data.image_Url,       

                }
                await User.create(userData)
                res.Json({})
                break;
            } 
                
            case 'User.updated' : {
                const UserData = { 
                    email : data.email_address[0].email_address,
                    name: data.first_name + " " + data.last_name, 
                    imageUrl: data.image_Url,       

                }
                await User.findByIdAndUpdate(data.id, userData)
                res.Json({})
                break; 
            }

            case 'User.deleted' : {
                await User.findByIdAndDelete(data.id)
                res.Json({})
                break; 
            }
        
            default:
                break;
        }

    } catch (error) {
        res.json({success: false, message: error.message})
        
    }
}