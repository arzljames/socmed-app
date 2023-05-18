import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import { PublicRoute } from "../utils/PublicRoute";
import Head from "next/head";
import LoginForm from "../components/form/login-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import Error from "next/error";
import _ from "lodash";
import Router, { useRouter } from "next/router";

const Login: NextPage = () => {
  const today: Date = new Date();

  // axios.defaults.withCredentials = true;
  // const [file, setFile] = useState([]);

  // const changeHandler = (event: any) => {
  //   // Passing file data (event.target.files[0]) to parse using Papa.parse
  //   Papa.parse(event.target.files[0], {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (results) {
  //       console.log(results.data);
  //       setFile(results.data);
  //     },
  //   });
  // };

  // const submitHandler = async () => {
  //   let successfull: number = 0;
  //   try {
  //     for (let i = 0; i < file?.length; i++) {
  //       const { approval_limit, ...rest } = file[i];

  //       const res = await axios.post(
  //         "https://api.eastwestbanker.qwote.ph/api/subgroup",
  //         {
  //           group: rest.group,
  //           sub_group_code: rest.sub_group_code,
  //           sub_group_name: rest.sub_group_name,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTI3VDA5OjQ1OjMyLjcwM1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0xOVQxNjoyODo0Ni44MTFaIiwiY29tcGFueSI6IjY0NDAxNjlkMGE4ZTBhN2RlNTk5MzAwMiJ9LCJpYXQiOjE2ODE5MzExMTYsImV4cCI6MTY4MjAxNzUxNn0.7P9BurQVSDwJroZVsDXI_aPaYCvA8eMTE1Gyf7xjDTw`,
  //           },
  //         }
  //       );

  //       if (res) {
  //         await axios.post(
  //           `https://api.eastwestbanker.qwote.ph/api/subgroup/${res.data._id}/approval-limit`,
  //           {
  //             approval_limit: _.parseInt(approval_limit),
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTI3VDA5OjQ1OjMyLjcwM1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0xOVQxNjoyODo0Ni44MTFaIiwiY29tcGFueSI6IjY0NDAxNjlkMGE4ZTBhN2RlNTk5MzAwMiJ9LCJpYXQiOjE2ODE5MzExMTYsImV4cCI6MTY4MjAxNzUxNn0.7P9BurQVSDwJroZVsDXI_aPaYCvA8eMTE1Gyf7xjDTw`,
  //             },
  //           }
  //         );
  //         successfull = +1;
  //       }
  //     }

  //     return successfull;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // };

  // const submitHandler = async () => {
  //   try {
  //     for (let i = 0; i < file?.length; i++) {
  //       const { requestor_id, approver_one, approver_two } = file[i];

  //       let approvers = [
  //         {
  //           user_id: approver_one.trim(),
  //           hierarchy_order: 1,
  //         },
  //       ];

  //       if (approver_two.length !== 0) {
  //         approvers.push({
  //           user_id: approver_two.trim(),
  //           hierarchy_order: 2,
  //         });
  //       }

  //       await axios.put(
  //         `https://api.eastwestbanker.qwote.ph/api/admin/settings/users/${requestor_id.trim()}`,
  //         { approvers },
  //         {
  //           headers: {
  //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTI3VDA5OjQ1OjMyLjcwM1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0yMFQwODowNjowNS44NjZaIiwiY29tcGFueSI6IjY0NDAxNjlkMGE4ZTBhN2RlNTk5MzAwMiJ9LCJpYXQiOjE2ODIzMTY5MzMsImV4cCI6MTY4MjQwMzMzM30.xO3oNa6sAd8OR-a_0X8A_JRMQxhNC3n68G-ZCszq578`,
  //           },
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // };

  // const submitHandler = async () => {
  //   try {
  //     for (let i = 0; i < file?.length; i++) {
  //       const {
  //         subgroup_id,
  //         street_address,
  //         code,
  //         postal,
  //         province,
  //         city,
  //         contact_number,
  //       } = file[i];

  //       const res = await axios.post(
  //         "https://api.eastwestbanker.qwote.ph/api/admin/settings/address",
  //         {
  //           code,
  //           address: {
  //             street_address,
  //             city,
  //             postal_code: postal,
  //             contact_number,
  //             province,
  //           },
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTI3VDA5OjQ1OjMyLjcwM1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0yMFQwODowNjowNS44NjZaIiwiY29tcGFueSI6IjY0NDAxNjlkMGE4ZTBhN2RlNTk5MzAwMiJ9LCJpYXQiOjE2ODIxMDA5NTksImV4cCI6MTY4MjE4NzM1OX0._b9ACyjkQ0W0kZs4b54MQ8QxUM-sUTmOnOJteWZIm9A`,
  //           },
  //         }
  //       );

  //       if (res) {
  //         await axios.post(
  //           `https://api.eastwestbanker.qwote.ph/api/admin/settings/subgroup/${subgroup_id}/address`,
  //           {
  //             subgroup_address: [res.data._id],
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTI3VDA5OjQ1OjMyLjcwM1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0yMFQwODowNjowNS44NjZaIiwiY29tcGFueSI6IjY0NDAxNjlkMGE4ZTBhN2RlNTk5MzAwMiJ9LCJpYXQiOjE2ODIxMDA5NTksImV4cCI6MTY4MjE4NzM1OX0._b9ACyjkQ0W0kZs4b54MQ8QxUM-sUTmOnOJteWZIm9A`,
  //             },
  //           }
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // };

  // const submitHandler = async () => {
  //   const res = await axios.get(
  //     "https://api.eastwestbanker.qwote.ph/api/user?skip=0&limit=9999999&sort_dir=asc&status=NEW",
  //     {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTI3VDA5OjQ1OjMyLjcwM1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0yMFQwODowNjowNS44NjZaIiwiY29tcGFueSI6IjY0NDAxNjlkMGE4ZTBhN2RlNTk5MzAwMiJ9LCJpYXQiOjE2ODIyNDQ2OTksImV4cCI6MTY4MjMzMTA5OX0.xzuiZFvl-T_wiDVttZyVUhGTyGnEQTLmHYbnunAtHj0`,
  //       },
  //     }
  //   );

  //   const users = [];

  //   if (res.data) {
  //     for (let i = 0; i < res.data.data.length; i++) {
  //       users.push(res.data.data[i]._id);
  //     }
  //   }

  //   try {
  //     for (let i = 0; i < users?.length; i++) {
  //       await axios.put(
  //         `https://api.eastwestbanker.qwote.ph/api/admin/settings/users/${users[i]}`,
  //         {
  //           status: "ACTIVE",
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTI3VDA5OjQ1OjMyLjcwM1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0yMFQwODowNjowNS44NjZaIiwiY29tcGFueSI6IjY0NDAxNjlkMGE4ZTBhN2RlNTk5MzAwMiJ9LCJpYXQiOjE2ODIyNDQ2OTksImV4cCI6MTY4MjMzMTA5OX0.xzuiZFvl-T_wiDVttZyVUhGTyGnEQTLmHYbnunAtHj0`,
  //           },
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // };

  // let subgroups = [];

  // useEffect(() => {
  //   if (file) {
  //     for (let i = 0; i < file?.length; i++) {
  //       subgroups.push(file[i].id);
  //     }
  //   }

  //   console.log(subgroups);
  // }, [file]);

  // const [name, setName] = useState("");
  // const [supplier, setSupplier] = useState("");
  // const [price, setPrice] = useState("");
  // const [unit, setUnit] = useState("");
  // const [image, setImage] = useState<any>([]);

  // const submitHandler = async () => {
  //   try {
  //     const form = new FormData();

  //     if (!file) return;
  //     if (!image) return;
  //     if (!name) return;

  //     _.forEach(file, (item, index) => {
  //       form.append(`sub_group[${index}]`, _.toString(item.id));
  //     });

  //     form.append("supplier", "6445fe7c4dcc76e654b72b16");
  //     form.append("item_name", name);
  //     form.append("item_desc", name);
  //     form.append("status", "ACTIVE");
  //     form.append("price", price);
  //     form.append("quantity", "100");
  //     form.append("unit", "Piece");
  //     form.append("default_photo", image);

  //     const res = await axios.post(
  //       "https://api-eastwestbanker.qwote.ph/api/catalog",
  //       form,
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrK3Rlc3RAZ21haWwuY29tIiwic3RhdHVzIjoiQUNUSVZFIiwidmVyaWZpZWRfZW1haWwiOnRydWUsInVzZXIiOnsib3JkZXJfc2VuZGVyIjoiNjQ0MTA1N2YwYThlMGE3ZGU1OTk2MjkyIiwibXVsdGlwbGVfc3ViX2dyb3VwcyI6W10sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTAyVDAzOjI4OjE0LjUwN1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNS0wNVQwNDoxMTo0OS4wNTNaIiwiZ3JvdXAiOiI2NDQwMWE0NmM1ZjEzOTEwMjFmNzZlZGUiLCJzdWJfZ3JvdXAiOiI2NDQwZDNjOGM1ZjEzOTEwMjFmNzg2MjciLCJjb21wYW55IjoiNjQ0MDE2OWQwYThlMGE3ZGU1OTkzMDAyIn0sImlhdCI6MTY4MzI2ODExMiwiZXhwIjoxNjgzMzU0NTEyfQ.MerfKz7NxAd2JZZnGi_7rCId90Z90u5smA9rFs6ImkI`,
  //         },
  //       }
  //     );

  //     if (res.data) {
  //       setName("");
  //       setPrice("");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const submitHandler = async () => {
  //   const res = await axios.get(
  //     "https://api.eastwestbanker.qwote.ph/api/admin/settings/users?skip=0&limit=9999&sort_dir=asc&sort_key=user_type&user_type=requestor",
  //     {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzbC56ZW5pYXJrQGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTI3VDA5OjQ1OjMyLjcwM1oiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0yMFQwODowNjowNS44NjZaIiwiY29tcGFueSI6IjY0NDAxNjlkMGE4ZTBhN2RlNTk5MzAwMiJ9LCJpYXQiOjE2ODIyNDQ2OTksImV4cCI6MTY4MjMzMTA5OX0.xzuiZFvl-T_wiDVttZyVUhGTyGnEQTLmHYbnunAtHj0`,
  //       },
  //     }
  //   );

  //   if (res) {
  //     for (let i = 0; i < res.data.data.length; i++) {
  //       console.log(res.data.data[i].email);
  //     }
  //   }
  // };

  const router = useRouter();
  const { demo_username, demo_password } = router.query as {
    demo_username: string;
    demo_password: string;
  };

  return (
    <>
      <Head>
        <title>Sign in | CreatVe</title>
      </Head>
      <div className="flex h-screen w-full">
        <div className=" hidden h-full w-full items-center justify-center bg-white md:flex md:w-[60%]">
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="/cover.jpg"
              className="h-full w-full object-cover object-center"
              alt="cover"
            />
            <div className="absolute right-5 bottom-5 rounded-full bg-white bg-opacity-10 py-1 px-4 backdrop:blur-sm">
              <p className="text-sm font-light tracking-wide text-[#ffffffd3]">
                © CreatVe {today.getFullYear()}
              </p>
            </div>
          </div>
        </div>
        <LoginForm
          demo_username={demo_username}
          demo_password={demo_password}
        />
      </div>
      {/* <div className="flex h-full w-full items-center justify-center bg-white">
        <form className="flex flex-col bg-white p-4">
          <input
            type="text"
            placeholder="name"
            className="mb-2 h-12 w-[300px] rounded-lg border-2 border-gray-200 px-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="price"
            className="mb-2 h-12 w-[300px] rounded-lg border-2 border-gray-200 px-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="file"
            placeholder="Visiblity"
            className="mb-2 h-12 w-[300px] rounded-lg border-2 border-gray-200 px-2"
            onChange={(e) => changeHandler(e)}
          />

          <input
            type="file"
            placeholder="image"
            className="mb-2 h-12 w-[300px] rounded-lg border-2 border-gray-200 px-2"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              submitHandler();
            }}
            className="mb-2 h-12 w-[300px] rounded-lg bg-color-main px-2 text-white"
          >
            Submit
          </button>
        </form>
      </div> */}
    </>
  );
};

export default Login;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if (!session) return PublicRoute();

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
    props: {},
  };
};
