import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Korea from "@/pages/Korea";
import Map from "@/pages/Map";
import Marketing from "@/pages/Marketing";
import Hotel from "@/pages/Hotel";
import HotelAdmin from "@/pages/HotelAdmin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Hotel} />
      <Route path="/korea" component={Korea} />
      <Route path="/map" component={Map} />
      <Route path="/marketing" component={Marketing} />
      <Route path="/hotel" component={Hotel} />
      <Route path="/hoteladmin" component={HotelAdmin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
