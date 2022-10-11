import { useRouter } from "next/router";
import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetail(props) {
  useRouter();
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}/>
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
      {/* <img src= alt="First Meetup" />
    <h1>First Meetup</h1>
    <address>Multan</address>
    <p>meetup</p> */}
    </Fragment>
  );
}

export async function getStaticPaths() {
  // console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://LaibaFaiz:Connecting123@cluster0.ylli3jv.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // const selectedMeetup = await meetupCollection.findOne({
  //   _id: ObjectId(meetupId),
  // });
  // console.log(selectedMeetup);
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://LaibaFaiz:Connecting123@cluster0.ylli3jv.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetail;
