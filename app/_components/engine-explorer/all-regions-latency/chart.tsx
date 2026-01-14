"use client";
import * as d3 from "d3";
import { useGetAllRegionLatency } from "@/app/_hooks/block-engine-explorer/get-all-region-latency";
import { useRef, useEffect } from "react";
import { useJitoNetwork } from "@/app/_hooks/block-engine-explorer/use-jito-network";

const margin = { top: 40, right: 20, bottom: 90, left: 80 };
const width = 800 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

export const AllRegionsBlockEngineBarChart = () => {
  const { currentNetwork } = useJitoNetwork();
  const { data, isLoading } = useGetAllRegionLatency({
    network: currentNetwork
  });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;
    const sortedData = [...data].sort((a, b) => a.latency - b.latency);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .append("text")
      .attr("x", (width + margin.left + margin.right) / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#5d4bff")
      .attr("font-size", "32px")
      .attr("font-weight", "700")
      .text("Block Engine Latency by Region");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.region))
      .range([0, width])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sortedData, (d) => d.latency) ?? 0])
      .range([height, 0]);

    g.selectAll(".bar")
      .data(sortedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.region) ?? 0)
      .attr("y", (d) => yScale(d.latency))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.latency))
      .attr("fill", "#5d4bff");

    const xAxisGroup = g
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    xAxisGroup
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("fill", "#5d4bff")
      .style("text-anchor", "end");

    xAxisGroup.selectAll("line, path").attr("stroke", "#7a7a7a");

    // Y-axis
    const yAxisGroup = g.append("g").call(d3.axisLeft(yScale));

    yAxisGroup.selectAll("text").attr("fill", "#5d4bff");

    yAxisGroup.selectAll("line, path").attr("stroke", "#7a7a7a");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#7a7a7a")
      .text("Latency (ms)");
  }, [data]);

  return (
    <div className="w-full flex flex-col items-center">
      {isLoading ? (
        <span className="text-2xl text-primary-brand">
          Measuring latencies...
        </span>
      ) : (
        <svg
          ref={svgRef}
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        />
      )}
    </div>
  );
};
