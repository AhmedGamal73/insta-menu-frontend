import { useState } from "react";

import Layout from "../../../@/components/dashboard/layout";
import Addons from "@/components/dashboard/products/addon/Addons";
import Categories from "@/components/dashboard/products/category/Categories";
import Products from "@/components/dashboard/products/Products";
import CreateItem from "@/components/dashboard/products/CreateItem";
import CategoriesPage from "./categories";
import variables from "@/config/variables";
import AddonsPage from "./addons";

function ProductsPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = variables.dashboardTabs.products;

  return (
    <Layout
      title="المنتجات"
      desc="يمكنك إضافة منتجك الخاص وتخصيص جميع معلوماته"
    >
      <div className="w-full flex justify-between items-center px-5 border-b-2">
        <div className="flex gap-2 w-1/2">
          {tabs.map((tab) => {
            return (
              <button
                key={tab.id}
                className={`rounded-none border-0 py-4 text-text  font-light px-4 text-sm${
                  activeTab === tab.id ? " border-b-4 border-primary" : ""
                } transition-all duration-200 ease-in-out`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
        {tabs[activeTab]?.component === "products" ? (
          <CreateItem item="منتج" dropDown={true} />
        ) : tabs[activeTab]?.component === "categories" ? (
          <CategoriesPage />
        ) : tabs[activeTab]?.component === "addons" ? (
          <AddonsPage />
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col gap-4 p-5">
        {tabs[activeTab]?.component === "products" ? (
          <Products />
        ) : tabs[activeTab]?.component === "categories" ? (
          <Categories />
        ) : tabs[activeTab]?.component === "addons" ? (
          <Addons />
        ) : (
          " لا يوجد محتوي "
        )}
      </div>
    </Layout>
  );
}

export default ProductsPage;
