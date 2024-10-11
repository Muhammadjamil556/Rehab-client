import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const FeedBack = () => {
  const [activeTab, setActiveTab] = useState("feedback");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg max-w-7xl w-full rounded-lg overflow-hidden flex">
        {/* Left Side */}
        <div
          className="flex-1 p-16 text-center flex flex-col justify-center bg-cover bg-center bg-gray-800 text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://thomasdigital.com/wp-content/uploads/2017/09/giving-feedback.jpg')",
          }}
        >
          <h1 className="font-serif text-4xl font-bold mb-4">
            {activeTab === "feedback"
              ? "FORM YOUR STORY."
              : "REPORT A PROBLEM."}
          </h1>
          <p className="font-sans text-lg mb-8">
            {activeTab === "feedback"
              ? "In the variety of choices, you may not know what you need. We can help. Drop us a line and we will be in touch."
              : "If you encounter any issues, please let us know. Your feedback helps us improve our service."}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1 p-16 bg-white">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="mb-6"
          >
            <TabsList className="flex border-b">
              <TabsTrigger
                value="feedback"
                className="flex-1 text-center py-2 font-semibold"
              >
                Feedback
              </TabsTrigger>
              <TabsTrigger
                value="report"
                className="flex-1 text-center py-2 font-semibold"
              >
                Report a Problem
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feedback">
              <form
                action="/submit_feedback"
                method="post"
                className="flex flex-col space-y-4"
              >
                <Input id="name" name="name" required className="w-full" />
                <Input id="phone" name="phone" required className="w-full" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                />
                <Input
                  id="message"
                  name="message"
                  required
                  className="w-full"
                />
                <Button
                  type="submit"
                  className="w-full bg-black text-white py-2"
                >
                  SHARE YOUR FEEDBACK
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="report">
              <form
                action="/report_problem"
                method="post"
                className="flex flex-col space-y-4"
              >
                <Input id="name" name="name" required className="w-full" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                />
                <Input
                  id="problem"
                  name="problem"
                  rows={4}
                  required
                  className="w-full"
                />
                <Button
                  type="submit"
                  className="w-full bg-black text-white py-2"
                >
                  REPORT PROBLEM
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
