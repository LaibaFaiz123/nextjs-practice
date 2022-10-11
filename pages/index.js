// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from 'next/head'
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";



function homePage(props) {
  // const[loadedMeetups,setLoadedMeetups]=useState([]);
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // }, []);

  return <Fragment>
    <Head>
      
    </Head>
     <MeetupList meetups={props.meetups} />;
  </Fragment>
  
}

// export async function getServerSideProps(context){
//   const req=context.req;
//   const res=context.res;
//   return{
//          props:{
//            meetups:DUMMY_MEETUPS
//         }
//        }
// }

export async function getStaticProps() {
  // fetch('/api/meetups')
  const client = await MongoClient.connect(
    "mongodb+srv://LaibaFaiz:Connecting123@cluster0.ylli3jv.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close()
  return {
    props: {
      meetups: meetups.map(meetup=>({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default homePage;
