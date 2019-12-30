import { apolloClient } from '../../plugins/graphql'
import gql from 'graphql-tag'

export const usersGQL = (since) => {
  return apolloClient.query({
    query: gql`query
      {
        users(since: ${since} ) {
          login
          id
          node_id
          avatar_url
          gravatar_id
          url
          html_url
          followers_url
          following_url
          gists_url
          starred_url
          subscriptions_url
          organizations_url
          repos_url
          events_url
          received_events_url
          type
          site_admin
        }
      }`
  }).then((res) => (res.data.users))
}

export const usersDetailsGQL = (user) => {
  return apolloClient.query({
    query: gql`query
        {
          usersDetails(user: "${user}" ) {
            login
            id
            node_id
            avatar_url
            gravatar_id
            url
            html_url
            followers_url
            following_url
            gists_url
            starred_url
            subscriptions_url
            organizations_url
            repos_url
            events_url
            received_events_url
            type
            site_admin
            name
            company
            blog
            location
            email
            hireable
            bio
            public_repos
            public_gists
            followers
            following
            created_at
            updated_at
          }
        }`
  }).then((res) => (res.data.usersDetails))
}

export const usersReposGQL = (user) => {
  return apolloClient.query({
    query: gql`query
        {
          usersRepos(user: "${user}" ) {
            id
            node_id
            name
            full_name
            private
            owner{
              login
              id
              node_id
              avatar_url
              gravatar_id
              url
              html_url
              followers_url
              following_url
              gists_url
              starred_url
              subscriptions_url
              organizations_url
              repos_url
              events_url
              received_events_url
              type
              site_admin
            }
            html_url
            description
            fork
            url
            forks_url
            keys_url
            collaborators_url
            teams_url
            hooks_url
            issue_events_url
            events_url
            assignees_url
            branches_url
            tags_url
            blobs_url
            git_tags_url
            git_refs_url
            trees_url
            statuses_url
            languages_url
            stargazers_url
            contributors_url
            subscribers_url
            subscription_url
            commits_url
            git_commits_url
            comments_url
            issue_comment_url
            contents_url
            compare_url
            merges_url
            archive_url
            downloads_url
            issues_url
            pulls_url
            milestones_url
            notifications_url
            labels_url
            releases_url
            deployments_url
            created_at
            updated_at
            pushed_at
            git_url
            ssh_url
            clone_url
            svn_url
            homepage
            size
            stargazers_count
            watchers_count
            language
            has_issues
            has_projects
            has_downloads
            has_wiki
            has_pages
            forks_count
            mirror_url
            archived
            disabled
            open_issues_count
            license{
              key
              name
              spdx_id
              url
              node_id
            }
            forks
            open_issues
            watchers
            default_branch
          }
        }`
  }).then((res) => (res.data.usersRepos))
}
