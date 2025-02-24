import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Chat component for handling user interactions and displaying messages.
 * Includes a message input, static and dynamic messages, and a sources section.
 * Utilizes Swiper for carousel navigation of sources.
 */
const Chat = () => {
    const [staticMessages, setStaticMessages] = useState([
        { id: 1, text: "Hello! 👋", isSent: false },
        { id: 2, text: "Hello Rimjhim, how can I help you today?", isSent: true },
        { id: 3, text: "Hi, I have some query and want an article for the same", isSent: false },
        { id: 4, text: "Hello! How can I assist you today? Please feel free to ask me any questions you may have, and I'll do my best to help.", isSent: true },
    ]);

    const [newMessages, setNewMessages] = useState([
        { id: 5, text: "How to setup the outlook?", isSent: false },
        { id: 6, text: "Hello! How can I assist you today? Please feel free to ask me any questions you may have, and I'll do my best to help.", isSent: true },
    ]);

    const [topDocuments, setTopDocuments] = useState([
           ]);


    const [message, setMessage] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    /**
     * Scrolls chat container to the bottom when new messages are added.
     */
    useEffect(() => {
        scrollToBottom();
    }, [newMessages]);

    /**
     * Adds an event listener to the bottom scroll button for auto-scrolling.
     */
    useEffect(() => {
        const bottomScrollButton = document.querySelector(".bottomScroll");
        if (bottomScrollButton && chatContainerRef.current) {
            bottomScrollButton.addEventListener("click", scrollToBottom);
        }

        return () => {
            if (bottomScrollButton) {
                bottomScrollButton.removeEventListener("click", scrollToBottom);
            }
        };
    }, []);

    /**
     * Scrolls the chat container to the bottom.
     */
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    /**
     * Handles sending a message.
     * Adds the user message to the chat and simulates a response after a delay.
     */
    /* const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now(),
                text: message,
                isSent: false
            };
            setNewMessages([...newMessages, newMessage]);
            setMessage('');
            setIsLoading(true);

            setTimeout(() => {
                const responseMessage = {
                    id: Date.now() + 1,
                    text: "Hello! How can I assist you today? Please feel free to ask me any questions you may have, and I'll do my best to help.",
                    isSent: true
                };
                setNewMessages(prevMessages => [...prevMessages, responseMessage]);
                setIsLoading(false);
            }, 1000);
        }
    }; */

    const handleSend = () => {
       let answerPiece = "" 
        if (message.trim()) {
          const newMessage = {
            id: Date.now(),
            text: message,
            isSent: false
          };
          setNewMessages([...newMessages, newMessage]);
          setMessage('');
          setIsLoading(true);
      
          // Integrate with onyx API
          const onyxApiUrl = 'http://3.213.172.65/api/chat/send-message'; // Replace this with your onyx api url
          const requestBody = {
            "alternate_assistant_id": 3,
            "chat_session_id": "10d877d9-66dc-4ccc-a08d-26fbe11e4e13",
            "parent_message_id": null,
            "message": message,
            "prompt_id": 7,
            "search_doc_ids": null,
            "file_descriptors": [],
            "regenerate": false,
            "retrieval_options": {
              "run_search": "auto",
              "real_time": true,
              "filters": {
                "source_type": null,
                "document_set": null,
                "time_cutoff": null,
                "tags": []
              }
            },
            "prompt_override": null,
            "llm_override": {
              "model_provider": "deepseek-r1",
              "model_version": "llama3.2"
            }
          };
      
          fetch(onyxApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          })
            .then(response => {
              const reader = response.body.getReader();
              const readChunk = () => {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    console.log('Stream ended');
                    return;
                  }
                  //console.log(value)
                let chunk_block = new TextDecoder('utf-8').decode(value);
                console.log(chunk_block);
                  let data = null
                  chunk_block = chunk_block.trim()
                  for(let chunk of chunk_block.split('\n'))
                  {
                    if(chunk!=null && chunk.length > 0){
                        try
                        {
                            data = JSON.parse(chunk);
                        }
                        catch(e){
                            console.log(e);
                            // Extract answer_piece manually using a simple text operation
                    }
                    }
      
                    // Handle answer_piece
                    if (data!=null && data.answer_piece) {
                        answerPiece += data.answer_piece;
                        let lastMessage = {
                        id: Date.now(),
                        text: answerPiece,
                        isSent: true
                        };
                        
                        
                        setNewMessages([...newMessages, lastMessage]);
                    }
        
                    // Handle top_documents
                    if (data && data.top_documents) {
                        let documents = data.top_documents;
                        setTopDocuments(prevDocuments => [...prevDocuments, ...documents]);
                    }
                }
        
                  readChunk();
                });
              };
              readChunk();
            })
            .catch(error => console.error('Error sending message to onyx API:', error));
        }
      };
    /**
     * Renders an individual message.
     * @param {Object} message - Message object containing text and sender info.
     * @returns {JSX.Element} JSX representation of a chat message.
     */
    const renderMessage = (message) => (
        <div key={message.id} className={message.isSent ? "chat_send" : "chat_receive"}>
            <img src={`/assets/images/${message.isSent ? "user01.png" : "user02.png"}`} alt="user" />
            <div className="chat_msg">
                <span>
                    {message.text}
                    {message.isSent && (
                        <div className="d-flex align-items-center chat_msg_action">
                            <a href="#!"><em className="icon-volume"></em></a>
                            <a href="#!"><em className="icon-like"></em></a>
                            <a href="#!"><em className="icon-dislike"></em></a>
                            <a href="#!"><em className="icon-copy"></em></a>
                            <a href="#!"><em className="icon-rotate"></em></a>
                        </div>
                    )}
                </span>
            </div>
        </div>
    );

    return (
        <main className="mainContent"> 
            <div className="pageContent">
                <div className="pageContent_title">KB Articles</div>
                <div className="chat position-relative">
                    <div className="chat_wrap" id="chatContainer" ref={chatContainerRef}>
                        {/* Render static messages first */}
                        {staticMessages.map(message => renderMessage(message))}

                        {/* Sources section */}
                        <div className="chat_sources">
                            <div className="chat_sources_title">Sources:</div>
                            <div className="chat_sources_wrap position-relative">
                               {/*  <Swiper modules={[Navigation]} slidesPerView={2.2} spaceBetween={12}
                                    breakpoints={{
                                        320: { slidesPerView: 1.2, spaceBetween: 10 },
                                        480: { slidesPerView: 1.5, spaceBetween: 10 },
                                        576: { slidesPerView: 1.8, spaceBetween: 10 },
                                        992: { slidesPerView: 2.2, spaceBetween: 12 }
                                    }}
                                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}>
                                      <SwiperSlide>
                                        <div className="swiper-slide-item">
                                            <p className="swiper-slide-item-title text-truncate">Setting Up Outlook: A Step-by-Step Guide</p>
                                            <p className="swiper-slide-item-content">Learn how to configure your email, calendar, and contacts in Outlook with ease.</p>
                                            <a className="btn d-inline-flex align-items-center btn-outline-secondary" href="#!">
                                                Learn more <em className="icon-arrow-right-outline ms-2"></em>
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide-item">
                                            <p className="swiper-slide-item-title text-truncate">Troubleshooting Outlook Setup Issues</p>
                                            <p className="swiper-slide-item-content">Common setup problems and quick fixes to get you back on track.</p>
                                            <a className="btn d-inline-flex align-items-center btn-outline-secondary" href="#!">
                                                Learn more <em className="icon-arrow-right-outline ms-2"></em>
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide-item">
                                            <p className="swiper-slide-item-title text-truncate">Setting Up Outlook: A Step-by-Step Guide</p>
                                            <p className="swiper-slide-item-content">Learn how to configure your email, calendar, and contacts in Outlook with ease.</p>
                                            <a className="btn d-inline-flex align-items-center btn-outline-secondary" href="#!">
                                                Learn more <em className="icon-arrow-right-outline ms-2"></em>
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                </Swiper> */}
                                <Swiper modules={[Navigation]} slidesPerView={2.2} spaceBetween={12}
    breakpoints={{
        320: { slidesPerView: 1.2, spaceBetween: 10 },
        480: { slidesPerView: 1.5, spaceBetween: 10 },
        576: { slidesPerView: 1.8, spaceBetween: 10 },
        992: { slidesPerView: 2.2, spaceBetween: 12 }
    }}
    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}>
    
    {topDocuments.map((doc, index) => (
        <SwiperSlide key={index}>
            <div className="swiper-slide-item">
                <p className="swiper-slide-item-title text-truncate">{doc.semantic_identifier}</p>
                <p className="swiper-slide-item-content">{doc.blurb}</p>
                <a className="btn d-inline-flex align-items-center btn-outline-secondary" href={doc.link || "#!"}>
                    Learn more <em className="icon-arrow-right-outline ms-2"></em>
                </a>
            </div>
        </SwiperSlide>
    ))}
</Swiper>

                                <div className="swiper-button swiper-button-next"></div>
                                <div className="swiper-button swiper-button-prev"></div>
                            </div>
                        </div>

                        {/* Render new messages after sources */}
                        {newMessages.map(message => renderMessage(message))}

                        {/* Loader */}
                        <div className={`text-start ${isLoading ? '' : 'd-none'}`}>
                            <img src="/assets/images/loader.png" alt="loader" />
                        </div>
                    </div>
                    <div className="chat_footer">
                        <a href="#!" className="bottomScroll d-flex align-items-center justify-content-center">
                            <em className="icon-arrow-right-bottom"></em>
                        </a>
                        <input type="text" placeholder="Ask me anything" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
                        <button type="button" className="chat_footer_send d-flex align-items-center justify-content-center p-0" onClick={handleSend}>
                            <em className="icon-arrow-right-top"></em>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Chat;
