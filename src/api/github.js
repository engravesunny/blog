// import axios from "axios";
// import { username } from "../constant";
// import { getGithubToken } from "./post";

// const getContributionRequest = axios.create({
//   baseURL: 'https://api.github.com'
// })

// getContributionRequest.interceptors.request.use(config => {
//   config.headers['Authorization'] = `bearer  ${token}`
//   return config
// })


// export const getContribution = async () => {
//   return getContributionRequest({
//     method: 'post',
//     url: '/graphql',
//     data: {
//       query: `query {
//               user(login: "${username}") {
//                 name
//                 contributionsCollection {
//                   contributionCalendar {
//                     colors
//                     totalContributions
//                     weeks {
//                       contributionDays {
//                         color
//                         contributionCount
//                         date
//                         weekday
//                       }
//                       firstDay
//                     }
//                   }
//                 }
//               }
//             }`
//     }
//   })
// }
import { username } from "../constant";
export const getContribution = async (token) => {
  const headers = {
    'Authorization': `bearer ${token}`,
  }
  const body = {
    "query": `query {
            user(login: "${username}") {
              name
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`
  }
  const response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })
  const data = await response.json()
  return data
}


