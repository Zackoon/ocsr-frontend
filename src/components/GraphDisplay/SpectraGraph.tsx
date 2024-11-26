import { Stack, Button, Card, Text} from "@mantine/core";
import { useState } from "react";
import DropdownContent from "../Dropdown/DropdownContent";
import DropdownButton from "../Dropdown/DropdownButton";
import { useAppContext } from "../AppLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const boxStyle = {
    margin: 10,
    padding: 5,
};

// Create chart data from wavelengths and coneResponses
const createChartData = (wavelengths, coneResponses) => {
    return wavelengths.map((wavelength, index) => ({
      wavelength,  // X-axis value
      sResponse: coneResponses.coneResponse1[index], // Y-value for S Cone
      mResponse: coneResponses.coneResponse2[index], // Y-value for M Cone
      lResponse: coneResponses.coneResponse3[index], // Y-value for L Cone
      qResponse: coneResponses.coneResponse4[index], // Y-value for L Cone
    }));
};

export default function GraphDisplay() {
    const [open, setOpen] = useState(false);
    const { wavelengths, coneResponses } = useAppContext();
    // TODO: Make sure to add a width parameter so we can change what the graph shows    
    const data = createChartData(wavelengths, coneResponses);
    
    return (
        <div>
            <DropdownButton open={open} setOpen={setOpen} leftDropdown={false}></DropdownButton>
            <DropdownContent open={open} width={400}>
               <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text size="lg" weight={500} mb="md">Cone Responses to Wavelengths</Text>
                    
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="wavelength" label={{ value: 'Wavelength (nm)', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis label={{ value: 'Response', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sResponse" stroke="#8884d8" name="S Cone Response" />
                            <Line type="monotone" dataKey="mResponse" stroke="#82ca9d" name="M Cone Response" />
                            <Line type="monotone" dataKey="lResponse" stroke="#ff7300" name="L Cone Response" />
                            <Line type="monotone" dataKey="lResponse" stroke="#ff7300" name="Q Cone Response" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </DropdownContent>
        </div>
    )
}