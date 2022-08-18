import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { server } from "./AxiosService.js"


class ProfilesService {
  async getProfileById(id) {
    const res = await server.get(`api/profiles/${id}`)
    // logger.log('what is a profile?', res.data)
    AppState.activeProfile = new Profile(res.data)
  }
}


export const profilesService = new ProfilesService()