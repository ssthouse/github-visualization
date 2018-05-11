import AV from 'leancloud-storage'
// import env from '@/components/util/env'

// Bean
const UserRecord = AV.Object.extend('UserRecord')

class UserRecorder {
  addRecord(githubUsername) {
    // if (env.isDevMode()) {
    //   console.log('emit user record in dev mode')
    //   return
    // }
    const userRecord = new UserRecord()
    userRecord
      .save({
        username: githubUsername
      })
      .then(result => {
        console.log('save userName to leancloud')
      })
      .catch(error => {
        console.log('error save user record to leancloud')
        console.log(error)
      })
  }
}

const userRecorder = new UserRecorder()
export default userRecorder
