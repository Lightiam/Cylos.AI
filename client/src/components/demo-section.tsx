import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertDemoRequest } from "@shared/schema";

export default function DemoSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<InsertDemoRequest>({
    fullName: "",
    email: "",
    company: "",
    environmentSize: "",
    message: ""
  });

  const demoRequestMutation = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      const response = await apiRequest("POST", "/api/demo-request", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      });
      setFormData({
        fullName: "",
        email: "",
        company: "",
        environmentSize: "",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ["/api/demo-requests"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.company || !formData.environmentSize) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    demoRequestMutation.mutate(formData);
  };

  const updateFormData = (field: keyof InsertDemoRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="demo" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
              See It In Action
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience autonomous AI security monitoring with our interactive demo. Watch as threats are detected and neutralized in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=500"
                alt="Real-time cybersecurity dashboard with threat monitoring and response metrics"
                className="rounded-2xl shadow-2xl shadow-sky-500/20 w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Threats Detected</span>
                    <span className="text-lg font-bold text-sky-500">247</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Response Time</span>
                    <span className="text-lg font-bold text-cyan-500">0.3s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Incidents Blocked</span>
                    <span className="text-lg font-bold text-teal-500">99.7%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Request Live Demo</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className="w-full bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:border-sky-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Business Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:border-sky-500"
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateFormData('company', e.target.value)}
                    className="w-full bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:border-sky-500"
                    placeholder="Your Company"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="environmentSize" className="block text-sm font-medium text-slate-300 mb-2">
                    Environment Size *
                  </Label>
                  <Select value={formData.environmentSize} onValueChange={(value) => updateFormData('environmentSize', value)}>
                    <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-50">
                      <SelectValue placeholder="Select environment size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-100">1-100 endpoints</SelectItem>
                      <SelectItem value="101-1000">101-1,000 endpoints</SelectItem>
                      <SelectItem value="1001-10000">1,001-10,000 endpoints</SelectItem>
                      <SelectItem value="10000+">10,000+ endpoints</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    rows={3}
                    value={formData.message || ""}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    className="w-full bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:border-sky-500"
                    placeholder="Tell us about your security requirements..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={demoRequestMutation.isPending}
                  className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-4 font-semibold hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 disabled:opacity-50"
                  size="lg"
                >
                  {demoRequestMutation.isPending ? 'Scheduling...' : 'Schedule Demo'}
                </Button>
              </form>
              <p className="text-xs text-slate-400 mt-4 text-center">
                Your information is secure and will only be used to schedule your demo. We respect your privacy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
