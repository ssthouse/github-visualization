import AV from 'leancloud-storage'

// Bean
const UserRecord = AV.Object.extend('UserRecord')

class UserRecorder {
  addRecord(githubUsername) {
    const userRecord = new UserRecord()
    userRecord
      .save({
        username: githubUsername
      })
      .then(result => {
        console.log('save userName to leancloud')
        console.log(result)
      })
  }
}

const userRecorder = new UserRecorder()
export default userRecorder
