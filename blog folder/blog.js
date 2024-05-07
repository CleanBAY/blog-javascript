import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";    
// import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'

import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'


let signOutBTN = document.getElementById('signOutBTN')

const firebaseConfig = {
  apiKey: "AIzaSyCFTTtUQh92vo97kscp8k8VRUnmymdZb5k",
  authDomain: "cleanbay-e7e4e.firebaseapp.com",
  projectId: "cleanbay-e7e4e",
  storageBucket: "cleanbay-e7e4e.appspot.com",
  messagingSenderId: "254937873244",
  appId: "1:254937873244:web:71185365c73f07b16b9f99"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const colRef = collection(db, 'Blog')



let AllBlogs = []

 async function getAllBlogs(){
   load.hidden = false
  try {
    const res = await getDocs(colRef)
    res.forEach((blog)=>{
      // console.log(blog.data(), blog.id);
 
      AllBlogs.push({...blog.data(), id:blog.id});
    })
    displayAllBlogs()
   console.log(AllBlogs);
  } catch (error) {
    console.log(error);
  } finally{
    load.hidden = true
  }

 }
 getAllBlogs()

function displayAllBlogs(){
 // console.log(AllBlogs);
 AllBlogs.forEach((blog)=>{
  allB.innerHTML += `
  <div class="imgdiv">
        <img src="${blog.image}" alt="Hero image" class="imgg">
     </div>
     <div class="details">
       <p class="fet">FEATURED</p>
       <h2 class="title">${blog.title.slice(0, 50)}</h2>
       <p class="des12">${blog.des.slice(0, 100)}</p>
       <p>${blog.date}</p>
       <a href="./readMore.html?id=${blog.id}"><button class='but2'>Read More</button></a>
     </div>
   `
 })
}
function navgat() {
  window.location.href = "./PostBlog.html"
  alert('hello world')
}

signOutBTN.addEventListener("click", async () => {
  // alert('hi')
  load.hidden = false
  try {
    const signOutTask = await signOut(auth);
    // console.log(signOutTask);
    console.log("user has been signed out");
    window.location.href = "../logIn.html";
  } catch (error) {
    console.log(error);
  }finally{
    load.hidden = true
  }
});

onAuthStateChanged(auth, (user)=>{
  if (user) {
  console.log(user); 
  usermail.innerText = `Hello, ${user.email}`;
  }
  else{
      console.log('No one is signed in');
  greeting.innerText = `Hello, Guest`;

  }
})

appssl.addEventListener('click', navgat)