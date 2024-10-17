"use client"
import { useEffect, useState } from 'react';

import { OmnichannelChatSDK } from '@microsoft/omnichannel-chat-sdk';
import { LiveChatWidget } from '@microsoft/omnichannel-chat-widget';

import { version as chatSdkVersion } from "@microsoft/omnichannel-chat-sdk/package.json";
import { version as chatWidgetVersion } from "@microsoft/omnichannel-chat-widget/package.json";
import { version as chatComponentVersion } from "@microsoft/omnichannel-chat-components/package.json";

// THIS IS DUMMY CONFIG - REPLACE VALUES BELOW WITH ONES USED BY YOUR ORGANISATION
const omnichannelConfig = {
  orgUrl: "https://www.org-url.com", // dummy config
  orgId: "00000000-0000-0000-0000-000000000000", // dummy config
  widgetId: "00000000-0000-0000-0000-000000000000" // dummy config
}

export default async function Widget() {
  const [liveChatWidgetProps, setLiveChatWidgetProps] = useState<any>();
  
  useEffect(() => {
    const init = async () => {
      console.log("Initialising...")
      const chatSDK = new OmnichannelChatSDK(omnichannelConfig);
      try {
        await chatSDK.getVoiceVideoCalling();
        console.log("VoiceVideoCalling loaded");
      } catch (e) {
        console.log(`Failed to load VoiceVideoCalling: ${e}`);
      }
      await chatSDK.initialize();
      const chatConfig = await chatSDK.getLiveChatConfig();

      const liveChatWidgetProps = {
        chatSDK: chatSDK,
        chatConfig: chatConfig,
        telemetryConfig: {
          OCChatSDKVersion: chatSdkVersion,
          chatWidgetVersion: chatWidgetVersion,
          chatComponentVersion: chatComponentVersion,
        },
        styleProps: {
          generalStyles: {
            width: "378px",
            height: "100%",
          }
        },
        controlProps: {
          hidePreChatSurveyPane: true,
          hidePostChatLoadingPane: true,
          hideFooter: true,
        },
        chatButtonProps: {
          controlProps: {
            titleText: "Chat Now",
            hideChatSubtitle: true,
          },
          styleProps: {
            generalStyleProps: {
              height: null,
              minWidth: null,
              backgroundColor: 'var(--accent)',
              selectors: {}
            },
            chatButtonHoveredStyleProps: {
              backgroundColor: 'var(--accent)',
            },
            iconStyleProps: {
              height: '40px',
              width: '40px',
              margin: '0 0 0 14px',
              backgroundColor: 'var(--accent)',
              backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" color="white" stroke="currentColor" stroke-width="0" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"%3E%3Ctitle%3E%3C/title%3E%3Cpath d="M4 21V8C4 7.20435 4.31607 6.44129 4.87868 5.87868C5.44129 5.31607 6.20435 5 7 5H17C17.7956 5 18.5587 5.31607 19.1213 5.87868C19.6839 6.44129 20 7.20435 20 8V14C20 14.7956 19.6839 15.5587 19.1213 16.1213C18.5587 16.6839 17.7956 17 17 17H8L4 21Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3Cpath d="M9.5 9H9.51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3Cpath d="M14.5 9H14.51" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3Cpath d="M9.5 13C9.82588 13.3326 10.2148 13.5968 10.6441 13.7772C11.0734 13.9576 11.5344 14.0505 12 14.0505C12.4656 14.0505 12.9266 13.9576 13.3559 13.7772C13.7852 13.5968 14.1741 13.3326 14.5 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3C/svg%3E')`,
            },
            titleStyleProps: {
              minWidth: null,
              maxWidth: null,
              margin: '0 24px 0 0',
              fontFamily: 'var(--font-brown-regular), Arial, Helvetica Neue',
              fontWeight: 700,
              fontSize: '14px',
              color: 'var(--white)',
            },
          }

        },
        headerProps: {
          controlProps: {
            hideIcon: true,
            hideTitle: true,
            hideMinimizeButton: true,
          },
          styleProps: {
            generalStyleProps: {
              background: 'var(--chat-background)',
            },
            closeButtonStyleProps: {
              borderRadius: '50%',
              background: 'var(--accent)',
              color: 'var(--white)',
            },
            closeButtonHoverStyleProps: {
              filter: 'inherit',
              borderRadius: '50%',
              background: 'var(--accent)',
              color: 'var(--white)',
            }
          }
        },
        webChatContainerProps: {
          disableMarkdownMessageFormatting: true, //setting the default to true for a known issue with markdown
          webChatStyles: {
            hideUploadButton: false,

            backgroundColor: 'var(--chat-background)',
            primaryFont: 'var(--font-brown-regular), Arial, Helvetica Neue',

            bubbleBackground: '#fff',
            bubbleTextColor: '#313548',
            bubbleBorderRadius: '20px !important',
            bubbleFromUserBackground: '#fff',
            bubbleFromUserBorderRadius: '20px !important',
            bubbleFromUserTextColor: '#313548',
          }
        },
        callingContainerProps: {
          controlProps: {
            hideCallingContainer: true,
          }
        }
      };
      
      setLiveChatWidgetProps(liveChatWidgetProps)
    }
    init()
  }, []);

  return (
    <div className="component">
      {liveChatWidgetProps && <LiveChatWidget {...liveChatWidgetProps} />}
    </div>
  )
}