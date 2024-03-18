import { Client } from "../../admin/models/client"

export interface ClientLogin {
  _id : string
  clientId : Client
  phoneNumber : string
  password: string
  image_url: string
  cloudinary_id: string
}
