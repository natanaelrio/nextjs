import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import stylesb from '@/styles/Banner.module.css'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Link from "next/link";
import React, { useEffect, useState } from 'react'



interface Post {
  uid: number;
  slug: string;
  judul: string;
  viewartikel: string;
  urlgambar: string;
  tanggalsamping: string;
  from: any;
}

interface BlogProps {
  datablog: Post[]
  datablogdua: Post[]
  datablogcari: Post[]
}

export default function Home(props: BlogProps) {
  const { datablog, datablogdua} = props;



  return (
    <>
      <Head>
        <meta name="google-site-verification" content="NUPnZEnTOb69JC5wg9ZBL1BY-5oKqi4DSnxWPOU4YXo" />
        <meta property="og:type" content="article" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#744E8F" />
        <title>DuaTeman.com</title>
        <meta name="description" content="informasi seputar anime dan manga baik dari sisi karakter, alur cerita, spoiler dan banyak lagi yang bisa anda temukan di DuaTeman." />
        <meta name="originalTitle" content="DuaTeman.com" />
        <meta name="keywords" content="duateman,dua teman,duatemancom,artikel duateman, komik duateman, baca anime ,baca manga,baca manga indo, baca anime, artikel anime, fakta anime, komik anime, anime,manga,manhwa,anime manga" />
        <meta name="author" content="DuaTeman.com" />
        <meta name="robots" content="index, follow" />
        <meta property="og:image" content="" />
        <link href="./duaW.svg" rel="shortcut icon" type="image/x-icon" />
      </Head>
      <body>

        <Header />
        <div className={styles.tai} >



          <div className={stylesb.wapper}>
            <div className={stylesb.katakata}>
              <div className={stylesb.judul}>DuaTeman.com</div>
              <div className={stylesb.deskripsi}>Temukan sudut pandang baru mengenai anime dan komik manga serta manhwa</div>
              <div className={stylesb.tombolstart}>
                <Link href="#artikel" scroll={false}><button>Baca Artikel</button></Link>
              </div>

            </div>

            <div className={stylesb.luarcardpopuler} >
              <div className={stylesb.wapper}>
                {datablogdua?.map((dataku) => {
                  return (
                    <>
                      <div className={stylesb.cardpopuleratas} key={dataku.uid}>
                        <div className={stylesb.gambar}>
                          <img src={dataku.urlgambar} alt={dataku.judul}></img>
                        </div>
                        <div className={stylesb.judul}>{dataku.judul}</div>
                        <div className={stylesb.linier}></div>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>



          <div className={styles.wapper} id="artikel">
            <div className={styles.judullistartikel}>Daftar Artikel</div>
          </div>
          <div className={styles.luarcard}>
            <div className={styles.luarcardwarp}>
              {datablog.map((dataku) => {

                return (
                  <>
                    <Link href={dataku.slug}>
                      <div className={styles.bungkuscard}>
                        <div className={styles.gambarartikel}>
                          <div className={styles.view}>
                            {dataku.viewartikel}
                          </div>
                          <img src={dataku.urlgambar} alt={dataku.judul}></img>
                          <div className="linierartikel"></div>
                        </div>
                        <div className={styles.bungkusdesartikel}>
                          <div className={styles.tanggal}>{dataku.tanggalsamping}</div>
                          <div className={styles.judul} >{dataku.judul}</div>
                        </div>
                      </div>
                    </Link>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </>
  )
}


export async function getServerSideProps() {

  const [datablogRes, datablogduaRes] = await Promise.all([
    fetch(`${process.env.API_ENDPOINT}?limit=50`),
    fetch(`${process.env.API_ENDPOINT}?limit=4`)
  ]);
  const [datablog, datablogdua] = await Promise.all([
    datablogRes.json(),
    datablogduaRes.json()
  ]);
  return {
    props: {
      datablog,
      datablogdua
    }
  };

}


