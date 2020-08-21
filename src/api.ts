import firebase from "firebase";


firebase.initializeApp({
    apiKey: "AIzaSyDrv1gpaTkwaufDsYYQ5A8G_6rjMvx_if4",
    authDomain: "react-blog-material-ui-36754.firebaseapp.com",
    databaseURL: "https://react-blog-material-ui-36754.firebaseio.com",
    projectId: "react-blog-material-ui-36754",
    storageBucket: "react-blog-material-ui-36754.appspot.com",
    messagingSenderId: "234844589180",
    appId: "1:234844589180:web:f203026358fe84a6358df9"
});

let db = firebase.firestore();
export {db}
export let docRef = db.collection("first_category")
export let docRef2 = db.collection("first_category").doc("m0eVFsLJsy7sVf4LRuF1")

export function get(collection: any) {
    return db.collection(collection).get()
        .then(querySnapshot => {
            let newsList: any = querySnapshot.docs.map(m => ({
                id: m.id,
                ...m.data()
            }));
            return newsList
        })

}

export function getList(whereId:any,collection: any, categoryId: any, limit:number) {
    return db.collection(collection).where(whereId, "==", categoryId).limit(limit)
        .get()
        .then(querySnapshot => {
            let news: any = querySnapshot.docs.map(m => ({
                id: m.id,
                ...m.data()
            }));

            return news
        })

}


export function getNewsCurrentUserList(CurrentUserId: any) {
    return db.collection("News").where("userId", "==", CurrentUserId)
        .get()
        .then(querySnapshot => {
            let news: any = querySnapshot.docs.map(m => ({
                id: m.id,
                ...m.data()
            }));

            return news
        })

}


export function getNewses(collection: any, newsNameId: any) {
    return db.collection(collection).doc(newsNameId)
        .get()
        .then(response => {
            return  {
                id: newsNameId,
                ...response.data()
            }

        })

}

export async function updateNewses(collection: any, newsNameId: any, data: any, imgSrc: any) {

    let colect = db.collection(collection).doc(newsNameId)
        .update({
            ...data
        })
    if(imgSrc) {
        let fileData = await firebase.storage().ref(`records/${newsNameId}`).put(imgSrc)
        let imageSrc = await fileData.ref.getDownloadURL();
        await db.collection('News').doc(`${newsNameId}`).update({
            imageSrc
        })
    }
    return colect
        .then(() => console.log("Succes"))
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

export function auth(login: any, password: any): any {
    return firebase.auth().signInWithEmailAndPassword(login, password)

}


export async function reg(login: any, password: any, name: string) {
    await firebase.auth().createUserWithEmailAndPassword(login, password)
        .then(() => {
            let user = firebase.auth().currentUser
            // console.log(user)
            if (user != null) user.updateProfile({
                displayName: name,
                photoURL: ""
            }).then(function () {
                db.collection("users").doc(user?.uid).set({
                    userId: user?.uid,
                    name: user?.displayName,
                    photoURL: user?.photoURL
                })
            }).catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                return error
                // An error happened.
            })
        })

}

export function initAuth(onAuth: any) {
    return firebase.auth().onAuthStateChanged(onAuth);

}


export async function curentUser() {
    try{
        return await firebase.auth().currentUser
    }catch (e) {
        console.log(e)
    }


}


export function f() {
    let user = firebase.auth().currentUser
    if (user != null) user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://images.unsplash.com/photo-1596807949858-58c2cb076fad"
    }).then(function () {
        console.log("Ssss")
    }).catch(function (error) {
        console.log(error)
        // An error happened.
    })
}

export async function  likes(collection: any, doc: any, arrayUnion: any, add: any) {
    let washingtonRef = await db.collection(collection).doc(doc);
    add ? await washingtonRef.update({
            likes: firebase.firestore.FieldValue.arrayUnion(arrayUnion)
        }).then().catch( (error)=>console.log(error) ) :
        await washingtonRef.update({
            likes: firebase.firestore.FieldValue.arrayRemove(arrayUnion)
        }).then().catch( (error)=>console.log(error) )

}

export async function addNews(News: any, imgSrc: any) {

    let addNews = await db.collection('News').add({
        imageSrc: '',
        ...News
    })
    if(imgSrc) {
        let fileData = await firebase.storage().ref(`records/${addNews.id}`).put(imgSrc)
        let imageSrc = await fileData.ref.getDownloadURL();
        // console.log(imageSrc)
        await db.collection('News').doc(`${addNews.id}`).update({
            imageSrc
        })

    }
return addNews

}

export async function signOut() {
    return await firebase.auth().signOut()


}

export async function liked(uid: any) {
    return await db.collection('News').where("likes", 'array-contains', uid).get()
        .then(r => {
            let news: any = r.docs.map(m => ({
                id: m.id,
                ...m.data()
            }));
            return news
        })
}


export async function author(authorId: any) {
    return await db.collection("users").where("userId", "==", authorId)
        .get()
}
export async function authors() {
    return await db.collection("users")
        .get() .then(response => {

          let mm:any =  response.docs.map(m => ({
                ...m.data()
            }));

          return mm
        })
}

export async function comment(newsId:any, limit: number) {
    if(newsId !==null && newsId !== undefined)
 return  await db.collection("News").doc(newsId).collection("Comments").orderBy("data", "desc").limit(limit).get()
       .then( r => {
           let news:any = r.docs.map(m => ({
               id: m.id,
               ...m.data()
           }));
           return news
       })


}

export async function setComment(newsId:any, data:any){

    await db.collection("News").doc(newsId).collection("Comments").doc().set({
        ...data,
    }).then(r => console.log(r, "responsAPI"))

}
export async function deleteComment(newsId:any, commentId:any){
    await db.collection("News").doc(newsId).collection("Comments").doc(commentId).delete().then(r => console.log(r, "responsAPI"))
}