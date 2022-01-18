import useSWR from "swr";
import axios from "../axios/Api";

const fetcher = url => axios.get(url);

export default function useUser () {
    const { data, mutate } = useSWR("/api/auth/autologin", fetcher);
    return {
      data: data?.data,
      mutate: mutate
    }
  }