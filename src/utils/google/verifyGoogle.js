import { OAuth2Client } from "google-auth-library";

const client =new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const verifyGoogleToken = async(idToken) =>{
  const ticket = await client.verifyIdToken({idToken});
  const payload = ticket.getPayload();
  return{
    email:payload.email,
    name:payload.name,
    picture:payload.picture,
    email_verified:payload.email_verified,
  };
};
