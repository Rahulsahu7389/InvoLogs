import { motion } from 'framer-motion';
import {
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  Upload,
  CheckSquare,
  BarChart3,
  Download,
  DollarSign,
  Calendar,
  Cpu,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInvoiceStore } from '@/store/invoiceStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';


// -------------------- SAMPLE DATA --------------------
const volumeData = [
  { name: 'Mon', invoices: 145 },
  { name: 'Tue', invoices: 232 },
  { name: 'Wed', invoices: 189 },
  { name: 'Thu', invoices: 278 },
  { name: 'Fri', invoices: 256 },
  { name: 'Sat', invoices: 87 },
  { name: 'Sun', invoices: 60 },
];

const confidenceData = [
  { name: 'Auto-approved', value: 68, fill: 'hsl(var(--success))' },
  { name: 'Needs Review', value: 22, fill: 'hsl(var(--warning))' },
  { name: 'Manual Fix', value: 10, fill: 'hsl(var(--destructive))' },
];


// ======================================================
//  DASHBOARD PAGE
// ======================================================
export default function Dashboard() {
  const { analytics } = useInvoiceStore();

  const kpiCards = [
    { title: 'Total Processed', value: analytics.totalProcessed.toLocaleString(), change:'+12%', trend:'up', icon: FileText, color:'primary' },
    { title: 'Accuracy Rate', value: `${analytics.accuracyRate}%`, change:'+2.3%', trend:'up', icon: TrendingUp, color:'success' },
    { title: 'Avg Process Time', value: `${analytics.avgProcessingTime}s`, change:'-0.5s', trend:'up', icon: Clock, color:'info' },
    { title: 'Pending Review', value: analytics.pendingReview.toString(), change:'5 urgent', trend:'down', icon: AlertCircle, color:'warning' },
  ];

  const extraKPIs = [
    { title:"Today's Invoices", value:"42", change:"+12", trend:'up', icon:Calendar, color:"info" },
    { title:"Needs Review", value:"3", change:"-1", trend:'down', icon:AlertCircle, color:"warning" },
    { title:"This Month", value:"$198K", change:"+8%", trend:'up', icon:DollarSign, color:"success" },
    { title:"Avg AI Confidence", value:"91.2%", change:"+1.5%", trend:"up", icon:Cpu, color:"primary" },
  ];


  return (
    <div className="space-y-10">

      {/* HEADER */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <h1 className="text-3xl font-bold">Welcome back, Vaibhavi! 👋</h1>
        <Badge variant="success" className="mt-1 flex items-center gap-1 w-fit">
          <Flame className="w-4 h-4"/> 6 day streak — keep going!
        </Badge>
      </motion.div>



      {/* KPI ROW 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i)=>(
          <Card key={i}>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <h2 className="text-3xl font-bold">{kpi.value}</h2>
                <span className={`text-sm flex items-center gap-1 mt-1 ${kpi.trend==='up'?'text-success':'text-warning'}`}>
                  {kpi.trend==='up'?<ArrowUpRight/>:<ArrowDownRight/>} {kpi.change}
                </span>
              </div>
              <div className={`w-12 h-12 bg-${kpi.color}/10 rounded-xl flex justify-center items-center`}>
                <kpi.icon className={`text-${kpi.color} w-6 h-6`}/>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>



      {/* KPI ROW 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {extraKPIs.map((kpi, i)=>(
          <Card key={i}>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <h2 className="text-2xl font-bold">{kpi.value}</h2>
                <span className={`text-sm flex items-center gap-1 mt-1 ${kpi.trend==='up'?'text-success':'text-warning'}`}>
                  {kpi.trend==='up'?<ArrowUpRight/>:<ArrowDownRight/>} {kpi.change}
                </span>
              </div>
              <div className={`w-10 h-10 bg-${kpi.color}/10 rounded-xl flex justify-center items-center`}>
                <kpi.icon className={`text-${kpi.color} w-5 h-5`}/>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>



      {/* ACTION BUTTONS */}
      <Card>
        <CardContent className="grid sm:grid-cols-4 gap-4 p-6 min-h-[100px] items-center">
          <Link to="/upload"><Button variant="hero" className="w-full h-[60px] text-md gap-2 py-4 rounded-xl shadow-md"><Upload/> Upload Invoice</Button></Link>
          <Link to="/review-queue"><Button variant="outline" className="w-full h-[60px] text-md gap-2 py-4 rounded-xl shadow-sm"><CheckSquare/> Review Queue</Button></Link>
          <Link to="/analytics"><Button variant="outline" className="w-full h-[60px] text-md gap-2 py-4 rounded-xl shadow-sm"><BarChart3/> Analytics</Button></Link>
          <Button variant="outline" className="w-full h-[60px] text-md gap-2 py-4 rounded-xl shadow-sm"><Download/> Export Data</Button>
        </CardContent>
      </Card>



      {/* GRAPH + AI CONFIDENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="flex gap-2"><TrendingUp/>Volume Trend</CardTitle></CardHeader>
          <CardContent className="h-[350px]"> {/* MATCH AI SIZE */}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name"/><YAxis/><Tooltip/>
                <Area type="monotone" dataKey="invoices" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#vol)"/>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>


        {/* AI CONFIDENCE */}
        <Card>
          <CardHeader><CardTitle className="flex gap-2"><Cpu/>AI Confidence</CardTitle></CardHeader>
          <CardContent className="h-[350px] flex flex-col">
            <div className="h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={confidenceData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                    {confidenceData.map((c,i)=><Cell key={i} fill={c.fill}/>)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              {confidenceData.map((item,i)=>(
                <div key={i} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{background:item.fill}}/>
                    {item.name}
                  </div>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>



      {/* ROW: RECENT | FIELD ACCURACY | QUEUE + COST SAVINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* RECENT ACTIVITY */}
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link to="/activity" className="text-primary text-sm">View All</Link>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {[
              ["INV-001234", "Acme Corp • $15,000", "Approved"],
              ["INV-001235", "XYZ Inc • $8,500", "Review"],
              ["INV-001236", "Beta Ltd • $22,100", "Approved"],
              ["INV-001237", "Gamma Co • $5,300", "Processing"],
              ["INV-001238", "Delta LLC • $31,200", "Failed"],
            ].map(([id,vendor,status],i)=>(
              <div key={i} className="flex justify-between">
                <div><b>{id}</b><p className="text-muted-foreground">{vendor}</p></div>
                <Badge variant={
                  status==="Approved"?"success":
                  status==="Review"?"warning":
                  status==="Processing"?"info":"destructive"}>
                  {status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>



        {/* FIELD ACCURACY */}
        <Card>
          <CardHeader><CardTitle>Field Accuracy</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              ["Invoice Number","99.2%"],
              ["Vendor Name","96.8%"],
              ["Amount","98.5%"],
              ["Date","94.1%"],
              ["PO Reference","91.3%"],
            ].map(([field,val],i)=>(
              <div key={i}>
                <div className="flex justify-between mb-1"><span>{field}</span><b>{val}</b></div>
                <div className="h-2 bg-secondary rounded"><div className="h-full bg-primary" style={{width:val}}/></div>
              </div>
            ))}
          </CardContent>
        </Card>



        {/* PROCESSING QUEUE + COST SAVINGS BELOW */}
        <div className="space-y-4">

          <Card className="h-[210px]"> {/* reduced */}
            <CardHeader><CardTitle>Processing Queue</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between"><span>In queue</span><b>12</b></div>
              <div className="flex justify-between"><span>Processing</span><b>3</b></div>
              <div className="flex justify-between"><span>Completed</span><b>156</b></div>
              <div className="flex justify-between border-t pt-2 mt-2 font-bold"><span>Total</span><span>171</span></div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground h-[160px] ">
            <CardContent className="p-4 space-y-1">
              <div className="flex gap-2 text-md"><Database className="w-4 h-4"/> Cost Savings</div>
              <h2 className="text-2xl font-bold">${analytics.costSaved.toLocaleString()}</h2>
              <p className="text-sm opacity-80">Automation vs Manual</p>
              <div className="text-sm border-t pt-1 mt-1 flex justify-between opacity-80">
                <span>Per invoice</span><b>$36.30</b>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>



      {/* TOP VENDORS + MONTHLY VOLUME */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TOP VENDORS */}
        <Card>
          <CardHeader><CardTitle>Top Vendors</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              ["Acme Corp",45,"$125,000","+12%"],
              ["XYZ Inc",38,"$98,500","+8%"],
              ["Beta Ltd",32,"$76,200","-3%"],
              ["Gamma Co",28,"$62,800","+15%"],
              ["Delta LLC",25,"$54,300","+5%"],
            ].map(([name,count,val,change],i)=>(
              <div key={i} className="flex justify-between">
                <div><b>{i+1}. {name}</b><p className="text-muted-foreground text-xs">{count} invoices</p></div>
                <div className="text-right"><b>{val}</b><p className={`text-xs ${change.includes('-')?'text-destructive':'text-success'}`}>{change}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* MONTHLY VOLUME */}
        <Card>
          <CardHeader><CardTitle>Monthly Invoice Volume</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer>
              <BarChart data={[
                {month:'Jul',val:140000},
                {month:'Aug',val:158000},
                {month:'Sep',val:149000},
                {month:'Oct',val:172000},
                {month:'Nov',val:185000},
                {month:'Dec',val:192000},
              ]}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/><YAxis/><Tooltip/>
                <Bar dataKey="val" fill="hsl(var(--primary))" radius={[8,8,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
