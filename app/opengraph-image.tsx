import { ImageResponse } from 'next/og';
import { eventConfig as e } from '@/config/eventConfig';
export const size={width:1200,height:630};
export const contentType='image/png';
export const alt=`${e.eventName} · ${e.celebrant}`;
export default function Image(){return new ImageResponse(<div style={{background:'#35151D',width:'100%',height:'100%',display:'flex',padding:35,color:'#C6AA78',fontFamily:'serif'}}><div style={{border:'1px solid #A98755',width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><div style={{fontSize:24,letterSpacing:7,marginBottom:35}}>{e.initials}</div><div style={{fontSize:64,color:'#F4EFE6'}}>{`${e.celebrants[0].name} ${e.celebrants[0].surname}`}</div><div style={{fontSize:28,marginTop:5,marginBottom:5}}>&</div><div style={{fontSize:64,color:'#F4EFE6'}}>{`${e.celebrants[1].name} ${e.celebrants[1].surname}`}</div><div style={{height:1,width:70,background:'#A98755',marginTop:30,marginBottom:30}}/><div style={{fontSize:24,letterSpacing:7}}>28 NOVIEMBRE 2026</div><div style={{fontSize:20,marginTop:28}}>{`${e.eventType} · Una noche para recordar`}</div></div></div>,size)}
