import React, { useState, useEffect } from "react";
import SearchBar from "../../components/UserSearch//searchBar";
import UserList from "../../components/UserSearch/userList";
import { searchUserData, type User } from "../../services/services";
import { useParams } from "react-router";

export function UserSearching() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [userData, setUserData] = React.useState<User[]>([]);

    const handleSearch = (query: string) => {
        console.log(query)
        setSearchQuery(query);
    }

    useEffect(() => {
        const fetchData = async() => {
            setUserData([]);
            console.log("hei?")
            console.log(searchQuery)
            const data = await searchUserData(searchQuery);
            // console.log(data);
            setUserData(data);
        };

        fetchData();
    }, [searchQuery]);


    return (
        <div>
            <div className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none
                    lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> BalanceBites </h1>
                            <h2 className="text-base font-semibold leading-7 text-indigo-600"> Eat Healthy </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-12 lg:px-8">
                 <SearchBar onSearch={handleSearch}/>
                 <div className="mt-6 py-10 sm:py-15">
                     <UserList userData={userData} />
                 </div>
            </div>

            {/* <div className="mt-6 py-10 sm:py-15">
                <UserList userData={userData} />
            </div> */}
        </div>
    );
}
