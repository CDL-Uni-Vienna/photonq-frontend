import NavbarPadding from "../components/Layout/NavbarPadding";
import Section from "../components/Section/Section";
import SectionText from "../components/Section/SectionText";
import Footer from "../components/Footer/Footer";
import Head from 'next/head'

const LegalPage = () => {
  return (
    <div className="relative flex flex-col items-center">
      <Head><title>PhotonQ Quantum Computing</title></Head>
      <div className={"w-full flex flex-col items-center"}>
        <NavbarPadding />
        <div className="mt-10">
          {/*Heading for whole page*/}
          <h1 className="text-5xl font-bold">Terms & Conditions - 06 March 2022</h1>
          <Section>
            {/**
             *  heading = Heading for Paragraphs
             *  paragraphs = Paragraphs for under the heading (Array)
             *   <p key={"key"}>YourTextHere</p> = normal text
             *     <a href="{yourUrlHere}", target="_blank">YorTextHere</a> = link
             *     <strong>YourBoldTextHere</strong>
             *     <em>YourItalicTextHere</em>
             *   pb-x = set spacing under paragraph
             *  If new Heading required:
             *  <Section>
             *    <SectionText />
             *  </Section>
             */}

            <SectionText
              heading={""}
              paragraphs={[
                <p key={"key"} className="pb-2">
                  <em>Welcome to PhotonQ!</em>
                </p>,
                <p key={"key"} className="pb-2">
                  PhotonQ offers public access to a photonic quantum computer and
                  aims to advance accessibility, operability, and integration of
                  photonic quantum computing platforms. The project is carried out
                  as part of the Christian Doppler Laboratory for Photonic Quantum
                  Computing in Vienna and is supported by the University of Vienna
                  and the Christian Doppler Research Society. PhotonQ has no legal
                  personality and the service is operated and managed by the
                  Christian Doppler Laboratory.
                </p>,
                <p key={"key"} className="pb-2">
                  These terms and conditions outline the rules and regulations
                  for the use of Christian Doppler Laboratory for Photonic
                  Quantum Computing&#39;s Website, located at <a href="https://photonq.at/" className="no-underline hover:underline">https://photonq.at</a>.
                  By accessing this website we assume you accept these terms
                  and conditions. Do not continue to use PhotonQ if you do not
                  agree to take all of the terms and conditions stated on this
                  page.
                </p>,
                <p key={"key"} className="pb-2">
                  The following terminology applies to these Terms and Conditions,
                  Privacy Statement and Disclaimer Notice and all Agreements:
                  &#34;Client&#34;, &#34;You&#34; and &#34;Your&#34; refers to you, the person log on this
                  website and compliant to the terms and conditions.
                  &#34;Ourselves&#34;, &#34;We&#34;, &#34;Our&#34;
                  and &#34;Us&#34;, refers to our Christian Doppler Laboratory for Photonic
                  Quantum Computing. &#34;Party&#34;, &#34;Parties&#34;, or &#34;Us&#34;, refers to both
                  the Client
                  and ourselves. Any use of the
                  above terminology or other words in the singular, plural,
                  capitalization and/or he/she or they, are taken as
                  interchangeable and therefore as referring to same.
                </p>,
              ]}
            />
          </Section>
          <Section>
            <SectionText
              heading={"Conditions of use"}
              paragraphs={[
                <p key={"key"} className="pb-2">
                  The user (also on behalf of his or her employer or affiliation)
                  agrees:
                </p>,
                <p key={"key"} className="pb-2">
                  1.	Not to use PhotonQ (including the PhotonQ app, the
                  information provided, the processing time offered) for other
                  purposes than to explore, learn and share quantum computing.
                </p>,
                <p key={"key"} className="pb-2">
                  2.	Not to attempt to try to access or use system components,
                  programs and/or files that do not belong to the user or to which
                  the user has not been explicitly granted access.
                </p>,
                <p key={"key"} className="pb-2">
                  3.	To reasonably report any detected or perceived errors in the
                  oftware, data communication and system disruptions to the
                  Christian Doppler Laboratory for Photonic Quantum Computing.
                </p>,
                <p key={"key"} className="pb-2">
                  4.	That accounts and associated login and password combinations are
                  strictly personal and may not be shared with other persons within
                  your organisation or with other organisations. Therefore you
                  assume responsibility for protecting that data and assume
                  liability for any damage resulting from the misuse by third
                  parties of own usernames, account numbers and passwords.
                </p>,
                <p key={"key"} className="pb-2">
                  5.	To accept that the PhotonQ facility is offered by the
                  Christian Doppler Laboratory for Photonic Quantum Computing on a
                  reasonable efforts basis and that interruptions of the service
                  may take place at any time, announced or not-announced.
                </p>,
                <p key={"key"} className="pb-2">
                  6.	To promptly report changes in contact information by updating
                  the user account information.
                </p>,
                <p key={"key"} className="pb-2">
                  7.	Not to request any indemnity or compensation from the
                  Christian Doppler Laboratory for Photonic Quantum Computing,
                  the University of Vienna, and its providers of equipment,
                  software and computing or storage facilities, for any damage
                  suffered as a result of
                  imperfections or non-availability of the system.
                </p>,
                <p key={"key"} className="pb-2">
                  8.	To apply adequate security policies and tools on your own
                  networks and systems used to gain access to PhotonQ, e.g.
                  state-of-the-art scanners for viruses or rootkits, to prevent
                  unauthorised use of or access to PhotonQ by third parties.
                </p>,
                <p key={"key"} className="pb-2">
                  9.	That any algorithms, data or code uploaded, stored and/or
                  executed by you are unconditionally open to be used by the
                  Christian Doppler Laboratory for Photonic Quantum Computing
                  for its own or public activities, unless agreed otherwise in
                  writing between you and the
                  Christian Doppler Laboratory for Photonic Quantum Computing before
                  uploading the algorithms,
                  data or code. You explicitly agree that the Christian Doppler
                  Laboratory for Photonic Quantum Computing may disseminate
                  all requests, data or code to third parties for use by third
                  parties as they see fit and you grant a free irrevocable license
                  to the Christian Doppler Laboratory for Photonic Quantum Computing
                  as well as any such third party to the uploaded content
                  for non-commercial purposes, including a right to disseminate the
                  uploaded content under open source and/or open content licenses of
                  its choice. Please note that after termination of the user account
                  all usernames and related account information will be removed from
                  the system. However, any uploaded, stored and/or executed
                  circuits, requests, or data will remain accessible to the Christian
                  Doppler Laboratory for Photonic Quantum Computing and its
                  partner organisations and may be disseminated to third parties.
                </p>,
                <p key={"key"} className="pb-2">
                  10.	That the Christian Doppler Laboratory for Photonic Quantum
                  Computing and its partner organisations do not accept
                  any liability for any damage that might result from your use of
                  the PhotonQ service rendered, unless the damage is the
                  result of wilful intent or gross negligence by the Christian
                  Doppler Laboratory for Photonic Quantum Computing.
                </p>,
                ,
              ]}
            />
          </Section>
          <Section>
            <SectionText
              heading={"Privacy statement"}
              paragraphs={[
                <p key={"key"} className="pb-2">
                  Please read <a href="https://dsba.univie.ac.at/fileadmin/user_upload/p_dsba/datenschutzerklaerung_websites_V04_26062020_EN.pdf" className="no-underline hover:underline">Data Protection Declaration
                    of the University of Vienna
                    (Websites).
                  </a>
                </p>,
                ,
              ]}
            />
          </Section>
          <Section>
            <SectionText
              heading={"Links"}
              paragraphs={[
                <p key={"key"} className="pb-2">
                  This website contains links to other websites. Please be aware
                  that we are not responsible for the content or privacy
                  practices of such other sites. We encourage our users to be
                  aware when they leave our site and to read the privacy
                  statements of any other site that collects personally
                  identifiable information.
                </p>,
                ,
              ]}
            />
          </Section>
          <Section>
            <SectionText
              heading={"Reservation of Rights"}
              paragraphs={[
                <p key={"key"} className="pb-2">
                  We reserve the right to request that you remove all links or
                  any particular link to our Website. You approve to immediately
                  remove all links to our Website upon request. We also reserve
                  the right to amen these terms and conditions and it’s linking
                  policy at any time. By continuously linking to our Website,
                  you agree to be bound to and follow these linking terms and
                  conditions.
                </p>,
                ,
              ]}
            />
          </Section>
          <Section>
            <SectionText
              heading={"Content Liability"}
              paragraphs={[
                <p key={"key"} className="pb-2">
                  We shall not be hold responsible for any content that appears
                  on your Website. You agree to protect and defend us against
                  all claims that is rising on your Website. No link(s) should
                  appear on any Website that may be interpreted as libelous,
                  obscene or criminal, or which infringes, otherwise violates,
                  or advocates the infringement or other violation of, any third party rights.
                </p>,
                ,
              ]}
            />
          </Section>
        </div>
      </div>
      <Section fullWidth>
        <div className="pt-24">
          <Footer />
        </div>
      </Section>
    </div>
  );
};

export default LegalPage;
