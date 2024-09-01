'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, AlertOctagon, Activity, Brain, Siren, Power, Shield, Map } from 'lucide-react'

interface Angel {
  id: number;
  name: string;
  distance: number;
  eta: number;
  type: string;
  threat: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface Eva {
  id: string;
  name: string;
  status: 'STANDBY' | 'ACTIVE' | 'REPAIR';
  syncRate: number;
  power: number;
}

interface Pilot {
  id: string;
  name: string;
  eva: string;
  heartRate: number;
  syncRate: number;
}

interface Magi {
  name: string;
  status: 'ONLINE' | 'OFFLINE';
  agreement: number;
}

export function NervDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [angels, setAngels] = useState<Angel[]>([])
  const [evas, setEvas] = useState<Eva[]>([])
  const [pilots, setPilots] = useState<Pilot[]>([])
  const [magiSystems, setMagiSystems] = useState<Magi[]>([])
  const [alertLevel, setAlertLevel] = useState<'NORMAL' | 'CAUTION' | 'DANGER'>('NORMAL')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const angelTimer = setInterval(() => {
      const angelTypes = ['飛行型', '水中型', '地上型', '変形型']
      const newAngel: Angel = {
        id: Math.floor(Math.random() * 1000),
        name: `第${Math.floor(Math.random() * 20)}使徒`,
        distance: Math.floor(Math.random() * 100),
        eta: Math.floor(Math.random() * 60),
        type: angelTypes[Math.floor(Math.random() * angelTypes.length)],
        threat: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)] as 'LOW' | 'MEDIUM' | 'HIGH'
      }
      setAngels(prev => {
        const updated = [...prev, newAngel].slice(-3)
        const closestAngel = updated.reduce((min, angel) => angel.distance < min.distance ? angel : min, updated[0])
        if (closestAngel.distance < 10) setAlertLevel('DANGER')
        else if (closestAngel.distance < 50) setAlertLevel('CAUTION')
        else setAlertLevel('NORMAL')
        return updated
      })
    }, 10000)

    const evaTimer = setInterval(() => {
      setEvas([
        { id: 'EVA-00', name: 'Zero', status: 'STANDBY', syncRate: Math.floor(Math.random() * 20) + 60, power: Math.floor(Math.random() * 100) },
        { id: 'EVA-01', name: 'Shogoki', status: 'ACTIVE', syncRate: Math.floor(Math.random() * 20) + 70, power: Math.floor(Math.random() * 100) },
        { id: 'EVA-02', name: 'Nigoki', status: 'REPAIR', syncRate: 0, power: Math.floor(Math.random() * 50) },
      ])
    }, 5000)

    const pilotTimer = setInterval(() => {
      setPilots([
        { id: 'REI', name: 'Rei Ayanami', eva: 'EVA-00', heartRate: Math.floor(Math.random() * 20) + 60, syncRate: Math.floor(Math.random() * 20) + 60 },
        { id: 'SHINJI', name: 'Shinji Ikari', eva: 'EVA-01', heartRate: Math.floor(Math.random() * 20) + 60, syncRate: Math.floor(Math.random() * 20) + 60 },
        { id: 'ASUKA', name: 'Asuka Langley', eva: 'EVA-02', heartRate: Math.floor(Math.random() * 20) + 60, syncRate: Math.floor(Math.random() * 20) + 60 },
      ])
    }, 5000)

    const magiTimer = setInterval(() => {
      setMagiSystems([
        { name: 'MELCHIOR', status: 'ONLINE', agreement: 98.7 + Math.random() * 1.3 },
        { name: 'BALTHASAR', status: 'ONLINE', agreement: 99.1 + Math.random() * 0.9 },
        { name: 'CASPER', status: 'ONLINE', agreement: 98.9 + Math.random() * 1.1 },
      ])
    }, 7000)

    return () => {
      clearInterval(angelTimer)
      clearInterval(evaTimer)
      clearInterval(pilotTimer)
      clearInterval(magiTimer)
    }
  }, [])

  const getAlertColor = (level: 'NORMAL' | 'CAUTION' | 'DANGER') => {
    switch (level) {
      case 'NORMAL': return 'text-green-500'
      case 'CAUTION': return 'text-yellow-500'
      case 'DANGER': return 'text-red-500 animate-pulse'
    }
  }

  const getStatusColor = (status: 'STANDBY' | 'ACTIVE' | 'REPAIR' | 'ONLINE' | 'OFFLINE') => {
    switch (status) {
      case 'STANDBY': return 'text-yellow-500'
      case 'ACTIVE': return 'text-green-500'
      case 'REPAIR': return 'text-red-500'
      case 'ONLINE': return 'text-green-500'
      case 'OFFLINE': return 'text-red-500'
    }
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@900&display=swap');
        
        body {
          background-color: black;
          color: #FFA500;
        }

        .nerv-heading {
          font-family: 'Noto Serif JP', serif;
          font-weight: 900;
          transform: scaleY(1.5);
          letter-spacing: -0.05rem;
        }
      `}</style>
      <div className="bg-black text-orange-500 font-mono p-4 min-h-screen flex flex-col">
        <header className="mb-4 flex justify-between items-center">
          <h1 className="nerv-heading text-3xl font-bold">NERV Command Center</h1>
          <div className={`nerv-heading text-2xl ${getAlertColor(alertLevel)} flex items-center`}>
            <AlertOctagon className="mr-2" />
            警戒レベル: {alertLevel}
          </div>
          <div className="nerv-heading text-xl">
            {currentTime.toLocaleTimeString()} - {currentTime.toLocaleDateString()}
          </div>
        </header>
        <main className="flex-grow grid grid-cols-3 gap-4">
          <section className="col-span-2 border border-orange-500 p-4 rounded-lg">
            <h2 className="nerv-heading text-2xl mb-4 flex items-center">
              <AlertTriangle className="mr-2" />
              使徒検知システム
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {angels.map(angel => (
                <div key={angel.id} className={`p-4 border ${angel.threat === 'HIGH' ? 'border-red-500' : 'border-orange-500'} rounded-lg`}>
                  <h3 className="nerv-heading text-xl mb-2">{angel.name}</h3>
                  <p>タイプ: {angel.type}</p>
                  <p>距離: {angel.distance}km</p>
                  <p>ETA: {angel.eta}分</p>
                  <p className={angel.threat === 'HIGH' ? 'text-red-500' : ''}>脅威: {angel.threat}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="border border-orange-500 p-4 rounded-lg">
            <h2 className="nerv-heading text-2xl mb-4 flex items-center">
              <Activity className="mr-2" />
              エヴァ稼働状況
            </h2>
            {evas.map(eva => (
              <div key={eva.id} className="mb-4 p-2 border border-orange-500 rounded-lg">
                <h3 className="nerv-heading text-xl">{eva.name}</h3>
                <div className="flex justify-between">
                  <span className={getStatusColor(eva.status)}>{eva.status}</span>
                  <span>同期率: {eva.syncRate}%</span>
                </div>
                <div className="mt-2 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${eva.power}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm">電力: {eva.power}%</div>
              </div>
            ))}
          </section>
          <section className="border border-orange-500 p-4 rounded-lg">
            <h2 className="nerv-heading text-2xl mb-4 flex items-center">
              <Shield className="mr-2" />
              パイロットバイタル
            </h2>
            {pilots.map(pilot => (
              <div key={pilot.id} className="mb-4 p-2 border border-orange-500 rounded-lg">
                <h3 className="nerv-heading text-xl">{pilot.name}</h3>
                <p>EVA: {pilot.eva}</p>
                <div className="flex justify-between">
                  <span>心拍数: {pilot.heartRate}</span>
                  <span>同期率: {pilot.syncRate}%</span>
                </div>
              </div>
            ))}
          </section>
          <section className="border border-orange-500 p-4 rounded-lg">
            <h2 className="nerv-heading text-2xl mb-4 flex items-center">
              <Brain className="mr-2" />
              MAGIシステム
            </h2>
            {magiSystems.map(magi => (
              <div key={magi.name} className="mb-2 flex justify-between items-center">
                <span>{magi.name}</span>
                <span className={getStatusColor(magi.status)}>{magi.status}</span>
                <span>一致率: {magi.agreement.toFixed(1)}%</span>
              </div>
            ))}
          </section>
          <section className="border border-orange-500 p-4 rounded-lg">
            <h2 className="nerv-heading text-2xl mb-4 flex items-center">
              <Map className="mr-2" />
              地理情報
            </h2>
            <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-lg">地図データ読み込み中...</span>
            </div>
          </section>
          <section className="border border-orange-500 p-4 rounded-lg flex items-center justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl flex items-center nerv-heading"
              onClick={() => alert('緊急事態が発令されました！全職員は直ちに非常時態勢に移行してください。')}
            >
              <Siren className="mr-2 h-6 w-6" />
              緊急事態発令
            </button>
          </section>
        </main>
      </div>
    </>
  )
}