const db = require('./db')
const Query = {
   //resolver function for greeting
   greeting:() => {
      return "hello from  TutorialsPoint !!!"
   },
   
   //resolver function for students returns list
   students:() => db.students.list(),

   //resolver function for studentbyId
   studentById:(root,args,context,info) => {
      //args will contain parameter passed in query
      return db.students.get(args.id);
   },

   //resolver function for students returns list
   colleges:() => db.colleges.list(),

   collegeById:(root,args,context,info) =>{
      return db.colleges.get(args.id)
   }

}

const Mutation = {
   addStudent:(root,args,context,info) => {
      const id = db.students.create({id:args.studentInput.id,firstName:args.studentInput.firstName,lastName:args.studentInput.lastName,collegeId:args.studentInput.college,password:args.studentInput.password});
      return id
   }
}

/*mutation{
  addStudent(id:"new-1-3",firstName:"Fama",lastName:"Rassoul",collegeId:"col-101",password:"fhjjn5852")
}


*/

//{id:"new-1-2",firstName:"Fama",lastName:"Rassoul",collegeId:"col-101",password:"fhjjn5852"}

//for each single student object returned,resolver is invoked

const Student = {
    fullName:(root,args,context,info) => {
       return root.firstName+":"+root.lastName
    },
    college:(root) => {
        return db.colleges.get(root.collegeId);
    }
 }



const College = {
   collegeStudents:(root,args,context,info) => {
      const allStudents = db.students.list();
      const filteredStudents = allStudents.filter(student => student.collegeId === root.id);
      return filteredStudents;
   }
}




module.exports = {Query,Student,College,Mutation}