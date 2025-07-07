import HeroSection from "@/components/hero";
import { featuresData, howItWorksData, statsData } from "@/landing";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className='mt-40'>
      <HeroSection/>
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((statsData,index)=>(
              <div key = {index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.value}</div>
                <div className="text-gray-600">{statsData.label}</div>

              </div>


            ))}
          </div>  
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-6 mx-auto">  
              <CardContent className="space-y-4 pt-4">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent> 
            </Card>
            ))}
          </div>
      </div>

    </section>


    <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-17">
            How we work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">{step.icon}</div>
                <h2 className="text-xl font-semibold mb-4">{step.title}</h2>
                <p className="text-gray-600">{step.describe}</p>
              </div>
            ))}
          </div>
      </div>

    </section>

    <section className="py-20 bg-blue-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Ready to take control of your finances?
        </h2>
        <p className="text-blue-800 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust Expensify to manage their expenses efficiently.
        </p>
        <Link href="/dashboard">
        
        <Button variant="ghost"  size="lg" className="px-20 py-5 bg-blue-50 text-blue-600 hover:bg-blue-100 animate-bounce">
Start Your Free Trial Now !
        </Button>
        </Link>
      </div>

    </section>

    </div>

  );
}
 