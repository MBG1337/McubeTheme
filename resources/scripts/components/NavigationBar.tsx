import * as React from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCodeBranch, faPlug, faSignOutAlt, faCalendar, faPlay, faTerminal, faFolder, faUsers, faDatabase, faNetworkWired, faCogs, faCloudUploadAlt, faCode, faServer, faUser, faBold, faExternalLinkAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw, { theme } from 'twin.macro';
import styled from 'styled-components/macro';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import { useState } from 'react';
import Can from '@/components/elements/Can';
import { ServerContext } from '@/state/server';
import ToolsBar from '@/routers/ServerRouter.tsx

const Hidden = styled.div`
justify: center
@media (max-width: 1400px) {
  display: none;

}
`;

const Navigation = styled.div`
    ${tw`z-50 bg-neutral-910 fixed flex items-center flex-col left-0 top-0 h-full`};
    width: 250px;
    overflow: overlay !important;

    @media (max-width: 1300px) {
        width: 200px;
      }

    @media (max-width: 700px) {
      width: 50px;
    }

`;

const List = styled.div`
    ${tw`w-full justify-center flex h-auto flex-col`};

    @media (max-width: 1400px) {
      ${tw`mt-4`}
    }

    & > a, & > button, & > .navigation-link {
      ${tw`text-white flex justify-between font-bold text-base items-center bg-transparent px-2 mr-5 pl-4 py-2`}
      transition: .3s;

      @media (max-width: 1400px) {
        ${tw`mx-2`}
      }

      & > span > span {
        ${tw`ml-1 select-none`}

        @media (max-width: 700px) {
          display: none;
        }
      }

      &:active, &.active  {
        ${tw`bg-accent-50 rounded-lg mx-3 pl-3 transition-all py-2.5 font-bold text-white`}
        transition: 0.3s ease
      }
    }
`;

export default () => {
  const match = useRouteMatch();
  const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
  const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onTriggerLogout = () => {
    setIsLoggingOut(true);
    http.post('/auth/logout').finally(() => {
      // @ts-ignore
      window.location = '/';
    });
  };

  return (
    <>
      <Navigation>
        <Hidden>
          <NavLink to={'/'} css={tw`select-none flex justify-center hidden sm:grid w-full mt-4 text-white text-2xl`}>
          <span>{name}</span>
          </NavLink>
          <div css={tw`flex w-full justify-center mt-2`}>
            
          </div>
        </Hidden>
        
        <List>
        <span css={tw`select-none hidden sm:block text-accent-50 font-bold ml-4`}>General</span>
          <NavLink to={'/'} exact>
            <span>
              <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faServer} />
              <span>My Servers</span>
            </span>
          </NavLink>
          <NavLink to={'/account'} exact>
            <span>
              <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faUser} />
              <span>Account</span>
            </span>
          </NavLink>
          {location.pathname.startsWith('/account') &&
        <>
          <NavLink to={'/account/api'} exact>
            <span>
              <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faCode} />
              <span>API</span>
            </span>
          </NavLink>
          </>}
          <button onClick={onTriggerLogout}>
            <span>
              <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faSignOutAlt} />
              <span>Logout</span>
            </span>
          </button>
          {rootAdmin &&
            <a href={'/admin'} rel={'noreferrer'}>
              <span>
                <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faCogs} />
                <span>Admin</span>
              </span>
            </a>
          }
        

        </List>
        {location.pathname.startsWith('/server') &&
        <>
              
          <List>
            <span css={tw`select-none  hidden sm:block text-accent-50 ml-4 font-bold`}>Server</span>
            <NavLink to={`${match.url}`} exact>
              <span>
                <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faTerminal} />
                <span>Console</span>
              </span>
            </NavLink>
            <Can action={'file.*'}>
              <NavLink to={`${match.url}/files`}>
                <span>
                  <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faFolder} />
                  <span>File Manager</span>
                </span>
              </NavLink>
            </Can>
            <Can action={'database.*'}>
              <NavLink to={`${match.url}/databases`}>
                <span>
                  <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faDatabase} />
                  <span>Databases</span>
                </span>
              </NavLink>
            </Can>
            <Can action={'schedule.*'}>
              <NavLink to={`${match.url}/schedules`}>
                <span>
                  <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faCalendar} />
                  <span>Schedules</span>
                </span>
              </NavLink>
            </Can>
            <Can action={'user.*'}>
              <NavLink to={`${match.url}/users`}>
                <span>
                  <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faUsers} />
                  <span>Users</span>
                </span>
              </NavLink>
            </Can>
            <Can action={'backup.*'}>
              <NavLink to={`${match.url}/backups`}>
                <span>
                  <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faCloudUploadAlt} />
                  <span>Backups</span>
                </span>
              </NavLink>
            </Can>
            <Can action={'allocation.*'}>
              <NavLink to={`${match.url}/network`}>
                <span>
                  <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faNetworkWired} />
                  <span>Ports</span>
                </span>
              </NavLink>
            </Can>
            <Can action={'startup.*'}>
              <NavLink to={`${match.url}/startup`}>
                <span>
                  <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faPlay} />
                  <span>Startup</span>
                </span>
              </NavLink>
            </Can>
            <Can action={['settings.*', 'file.sftp']} matchAny>
              <NavLink to={`${match.url}/settings`}>
                <span>
                  <FontAwesomeIcon css={tw`text-white`} fixedWidth icon={faCogs} />
                  <span>Settings</span>
                </span>
              </NavLink>
            </Can>
            <ToolsBar/>
            {/* <span css={tw`select-none hidden sm:block text-accent-50 font-bold ml-4`}>Tools</span>
            <Can action={['version.*']} matchAny>
              <NavLink to={`${match.url}/versions`}>
                <span>
                  <FontAwesomeIcon css={tw`text-accent-50`} fixedWidth icon={faCodeBranch} />
                  <span>Versions</span>
                </span>
              </NavLink>
            </Can>
            <Can action={['subdomain.*']} matchAny>
              <NavLink to={`${match.url}/subdomain`}>
                <span>
                  <FontAwesomeIcon css={tw`text-accent-50`} fixedWidth icon={faGlobe} />
                  <span>Subdomain</span>
                </span>
              </NavLink>
            </Can> */}

          </List>
        </>
        }
      </Navigation>
    </>
  );
};







// import * as React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCogs, faLayerGroup, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { useStoreState } from 'easy-peasy';
// import { ApplicationStore } from '@/state';
// import SearchContainer from '@/components/dashboard/search/SearchContainer';
// import tw, { theme } from 'twin.macro';
// import styled from 'styled-components/macro';
// import http from '@/api/http';
// import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
// import { useState } from 'react';

// const Navigation = styled.div`
//     ${tw`w-full bg-neutral-900 shadow-md overflow-x-auto`};
    
//     & > div {
//         ${tw`mx-auto w-full flex items-center`};
//     }
    
//     & #logo {
//         ${tw`flex-1`};
        
//         & > a {
//             ${tw`text-2xl font-header px-4 no-underline text-neutral-200 hover:text-neutral-100 transition-colors duration-150`};
//         }
//     }
// `;

// const RightNavigation = styled.div`
//     ${tw`flex h-full items-center justify-center`};
    
//     & > a, & > button, & > .navigation-link {
//         ${tw`flex items-center h-full no-underline text-neutral-300 px-6 cursor-pointer transition-all duration-150`};
        
//         &:active, &:hover {
//             ${tw`text-neutral-100 bg-black`};
//         }
        
//         &:active, &:hover, &.active {
//             box-shadow: inset 0 -2px ${theme`colors.cyan.700`.toString()};
//         }
//     }
// `;

// export default () => {
//     const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
//     const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
//     const [ isLoggingOut, setIsLoggingOut ] = useState(false);

//     const onTriggerLogout = () => {
//         setIsLoggingOut(true);
//         http.post('/auth/logout').finally(() => {
//             // @ts-ignore
//             window.location = '/';
//         });
//     };

//     return (
//         <Navigation>
//             <SpinnerOverlay visible={isLoggingOut} />
//             <div css={tw`mx-auto w-full flex items-center`} style={{ maxWidth: '1200px', height: '3.5rem' }}>
//                 <div id={'logo'}>
//                     <Link to={'/'}>
//                         {name}
//                     </Link>
//                 </div>
//                 <RightNavigation>
//                     <SearchContainer/>
//                     <NavLink to={'/'} exact>
//                         <FontAwesomeIcon icon={faLayerGroup}/>
//                     </NavLink>
//                     <NavLink to={'/account'}>
//                         <FontAwesomeIcon icon={faUserCircle}/>
//                     </NavLink>
//                     {rootAdmin &&
//                     <a href={'/admin'} rel={'noreferrer'}>
//                         <FontAwesomeIcon icon={faCogs}/>
//                     </a>
//                     }
//                     <button onClick={onTriggerLogout}>
//                         <FontAwesomeIcon icon={faSignOutAlt}/>
//                     </button>
//                 </RightNavigation>
//             </div>
//         </Navigation>
//     );
// };




// import * as React from 'react';
// import { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCogs, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { useStoreState } from 'easy-peasy';
// import { ApplicationStore } from '@/state';
// import SearchContainer from '@/components/dashboard/search/SearchContainer';
// import tw, { theme } from 'twin.macro';
// import styled from 'styled-components/macro';
// import http from '@/api/http';
// import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
// import Tooltip from '@/components/elements/tooltip/Tooltip';
// import Avatar from '@/components/Avatar';

// const RightNavigation = styled.div`
//     & > a,
//     & > button,
//     & > .navigation-link {
//         ${tw`flex items-center h-full no-underline text-neutral-300 px-6 cursor-pointer transition-all duration-150`};

//         &:active,
//         &:hover {
//             ${tw`text-neutral-100 bg-black`};
//         }

//         &:active,
//         &:hover,
//         &.active {
//             box-shadow: inset 0 -2px ${theme`colors.cyan.600`.toString()};
//         }
//     }
// `;

// export default () => {
//     const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
//     const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
//     const [isLoggingOut, setIsLoggingOut] = useState(false);

//     const onTriggerLogout = () => {
//         setIsLoggingOut(true);
//         http.post('/auth/logout').finally(() => {
//             // @ts-expect-error this is valid
//             window.location = '/';
//         });
//     };

//     return (
//         <div className={'w-full bg-neutral-900 shadow-md overflow-x-auto'}>
//             <SpinnerOverlay visible={isLoggingOut} />
//             <div className={'mx-auto w-full flex items-center h-[3.5rem] max-w-[1200px]'}>
//                 <div id={'logo'} className={'flex-1'}>
//                     <Link
//                         to={'/'}
//                         className={
//                             'text-2xl font-header px-4 no-underline text-neutral-200 hover:text-neutral-100 transition-colors duration-150'
//                         }
//                     >
//                         {name}
//                     </Link>
//                 </div>
//                 <RightNavigation className={'flex h-full items-center justify-center'}>
//                     <SearchContainer />
//                     <Tooltip placement={'bottom'} content={'Dashboard'}>
//                         <NavLink to={'/'} exact>
//                             <FontAwesomeIcon icon={faLayerGroup} />
//                         </NavLink>
//                     </Tooltip>
//                     {rootAdmin && (
//                         <Tooltip placement={'bottom'} content={'Admin'}>
//                             <a href={'/admin'} rel={'noreferrer'}>
//                                 <FontAwesomeIcon icon={faCogs} />
//                             </a>
//                         </Tooltip>
//                     )}
//                     <Tooltip placement={'bottom'} content={'Account Settings'}>
//                         <NavLink to={'/account'}>
//                             <span className={'flex items-center w-5 h-5'}>
//                                 <Avatar.User />
//                             </span>
//                         </NavLink>
//                     </Tooltip>
//                     <Tooltip placement={'bottom'} content={'Sign Out'}>
//                         <button onClick={onTriggerLogout}>
//                             <FontAwesomeIcon icon={faSignOutAlt} />
//                         </button>
//                     </Tooltip>
//                 </RightNavigation>
//             </div>
//         </div>
//     );
// };
