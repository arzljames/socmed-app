import type { NextPage } from "next";
import Head from "next/head";
import Post from "../components/Home/Post";
import { useState } from "react";
import Header from "../components/Home/Header";
import Navbar from "../components/Home/Navbar";
import PostModal from "../components/Home/PostModal";
import Sidebar from "../components/Home/Sidebar";

const Home: NextPage = () => {
  const [isPosting, setIsPosting] = useState<Boolean>(false);
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  return (
    <div>
      <Head>
        <title>Home Feed | SocMed</title>
      </Head>

      {isPosting && <PostModal setIsPosting={setIsPosting} />}

      <div className="flex min-h-screen w-screen flex-col items-start justify-start bg-gray-100 md:w-full md:flex-row md:bg-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Home Feed */}
        <div className="h-full w-full flex-1">
          <div className="sticky top-0">
            <Header />
            <Navbar />
          </div>
          {/* Posts */}
          <div className="md:w-3/ my-3 h-auto w-full">
            <Post setIsPosting={setIsPosting} />
          </div>
          {/* Feed */}
          <div className="mb-2  w-full border-y-2 bg-white px-3 py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            recusandae natus minima autem impedit, quidem commodi veniam ut
            mollitia. Unde vel a magni eaque deleniti doloribus vero cum rerum,
            placeat consequuntur ducimus! Accusamus sint repudiandae
            consequuntur ipsam quae facere nulla dicta sunt magnam eum rerum
            voluptates officia consequatur quibusdam incidunt eius quisquam, id
            totam possimus perferendis voluptatem quo delectus mollitia illo.
            Iure, sequi similique. Cupiditate, sequi. Deleniti temporibus fuga
            optio provident esse non voluptatibus officiis laboriosam soluta
            fugiat vitae nobis id, tenetur earum possimus iure minima ratione,
            impedit qui, ipsum pariatur ea quisquam dolor repudiandae? Dolores
            atque et doloribus rerum.
          </div>

          <div className="mb-2  w-full border-y-2 bg-white px-3 py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            recusandae natus minima autem impedit, quidem commodi veniam ut
            mollitia. Unde vel a magni eaque deleniti doloribus vero cum rerum,
            placeat consequuntur ducimus! Accusamus sint repudiandae
            consequuntur ipsam quae facere nulla dicta sunt magnam eum rerum
            voluptates officia consequatur quibusdam incidunt eius quisquam, id
            totam possimus perferendis voluptatem quo delectus mollitia illo.
            Iure, sequi similique. Cupiditate, sequi. Deleniti temporibus fuga
            optio provident esse non voluptatibus officiis laboriosam soluta
            fugiat vitae nobis id, tenetur earum possimus iure minima ratione,
            impedit qui, ipsum pariatur ea quisquam dolor repudiandae? Dolores
            atque et doloribus rerum.
          </div>

          <div className="mb-2  w-full border-y-2 bg-white px-3 py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            recusandae natus minima autem impedit, quidem commodi veniam ut
            mollitia. Unde vel a magni eaque deleniti doloribus vero cum rerum,
            placeat consequuntur ducimus! Accusamus sint repudiandae
            consequuntur ipsam quae facere nulla dicta sunt magnam eum rerum
            voluptates officia consequatur quibusdam incidunt eius quisquam, id
            totam possimus perferendis voluptatem quo delectus mollitia illo.
            Iure, sequi similique. Cupiditate, sequi. Deleniti temporibus fuga
            optio provident esse non voluptatibus officiis laboriosam soluta
            fugiat vitae nobis id, tenetur earum possimus iure minima ratione,
            impedit qui, ipsum pariatur ea quisquam dolor repudiandae? Dolores
            atque et doloribus rerum.
          </div>

          <div className="mb-2  w-full border-y-2 bg-white px-3 py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            recusandae natus minima autem impedit, quidem commodi veniam ut
            mollitia. Unde vel a magni eaque deleniti doloribus vero cum rerum,
            placeat consequuntur ducimus! Accusamus sint repudiandae
            consequuntur ipsam quae facere nulla dicta sunt magnam eum rerum
            voluptates officia consequatur quibusdam incidunt eius quisquam, id
            totam possimus perferendis voluptatem quo delectus mollitia illo.
            Iure, sequi similique. Cupiditate, sequi. Deleniti temporibus fuga
            optio provident esse non voluptatibus officiis laboriosam soluta
            fugiat vitae nobis id, tenetur earum possimus iure minima ratione,
            impedit qui, ipsum pariatur ea quisquam dolor repudiandae? Dolores
            atque et doloribus rerum.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
