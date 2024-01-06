import React from "react";
import Layout from "../components/commons/Layout";

const Index = () => {
  return (
    <Layout>
      <section className=" w-full mt-14 m-auto">
        <div className="flex items-center justify-center font-bold text-center text-[2.5em] bg-[#010118] h-60 mb-10">
          <p className="text-white">Career</p>
        </div>
        <div className="w-8/12 m-auto">
          <div className="flex">
            <div className="w-4/12 flex pr-2 mx-2 flex-col border-r-2">
              <p className="text-[2.5em]">대륜</p>
              <ul>
                <li className="flex my-3 items-center">
                  <p className="flex justify-between w-3/12 font-bold text-[20px] mr-2">
                    <span>포지션</span>
                    <span>:</span>
                  </p>
                  <p>Fronted-develop</p>
                </li>
                <li className="flex my-3 items-center">
                  <p className="flex justify-between w-3/12 font-bold text-[20px] mr-2">
                    <span>재직기간</span> <span>:</span>
                  </p>
                  <p>2023 09 04 ~</p>
                </li>
                <li className="flex my-3 items-center">
                  <p className="flex justify-between w-3/12 font-bold text-[20px] mr-2">
                    <span>직급</span> <span>:</span>
                  </p>
                  <p>2023 09 04 ~</p>
                </li>
              </ul>
            </div>
            <div className="mx-4">
              <div className="ml-6">
                <p className="my-4 text-[1.5em]">자사 홈페이지 리뉴얼</p>
                <ul className="list-disc leading-10	">
                  <li>
                    채팅 기능을 위해 NOSQL(MongoDB) 도입 및 Socket.io 사용
                  </li>
                  <li>NextJs Vercel 배포 및 NodeJs EC2 배포</li>
                  <li>보안을 위한 NginX 포트포워딩 적용 및 SSL 적용</li>
                </ul>
                <p className="my-4 text-[1.5em]">앱 신규개발</p>
                <ul className="list-disc leading-10	">
                  <li>React-Hook-Form을 이용하여 유효성 검사</li>
                  <li>
                    JWT 토큰을 쿠키에 저장 및 localStorage 와 Redux에 로그인
                    정보 저장
                  </li>
                  <li>Oauth 2.0(Naver) 제공</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
