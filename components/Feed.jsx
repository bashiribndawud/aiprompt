"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [allposts, setAllPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    
    filterPrompt(searchText);
  };

  const fetchPost = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  
  const filterPrompt = (searchtext) => {
    const regex = new RegExp(searchtext, "i");

    const filteredData = allposts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );

    setSearchResult(filteredData);
    
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompt(tagName);
    
    setSearchResult(searchResult);
  }
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input"
          required
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>
      {searchResult && searchResult.length > 0 ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allposts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
