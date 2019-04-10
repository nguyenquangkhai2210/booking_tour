/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.controller.serviceController.userService.orderSevice;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.controller.ReadBodyRequest;
import khainq.modals.dto.OrderDetail;
import khainq.modals.dto.OrderTourDetail;
import khainq.modals.tbl_Order.Tbl_OrderDAO;
import khainq.modals.tbl_Order.Tbl_OrderDTO;
import khainq.modals.tbl_OrderDetail.Tbl_OrderDetailDAO;
import khainq.modals.tbl_OrderDetail.Tbl_OrderDetailDTO;
import khainq.modals.tbl_Tours.Tbl_ToursDAO;
import khainq.modals.tbl_Tours.Tbl_ToursDTO;
import khainq.security.TokenAuthencationService;

/**
 *
 * @author khainguyenquang
 */
public class GetOrderDetail extends HttpServlet {

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("test/json; charset = UTF-8");
        PrintWriter pw = response.getWriter();

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        ReadBodyRequest bodyRequest = new ReadBodyRequest();
        String jsonBody = bodyRequest.getJsonBody(request);

        Tbl_OrderDTO dto = gson.fromJson(jsonBody, Tbl_OrderDTO.class);

        TokenAuthencationService authencationService = new TokenAuthencationService();

        String username = authencationService.getUserFromAuthentication(request);
        String role = authencationService.getRoleFromAuthentication(request);

        try {
            if (role.equals("user")) {
                Tbl_OrderDAO orderDAO = new Tbl_OrderDAO();

                Tbl_OrderDTO orderDTO = orderDAO.getOneOrder(username, dto.getId());

                Tbl_OrderDetailDAO detailDAO = new Tbl_OrderDetailDAO();
                List<Tbl_OrderDetailDTO> orderDetailDTO = detailDAO.getListOrderDetail(orderDTO.getId());

                List<OrderTourDetail> listTour = new ArrayList<>();

                orderDetailDTO.forEach(data -> getListTour(listTour, data));

                OrderDetail orderDetail = new OrderDetail(listTour, orderDTO);

                String json = gson.toJson(orderDetail);

                pw.append(json);
                response.setStatus(200);
            }
        } catch (Exception e) {
            log("ERROR at GetOrderDetail controller: " + e.getMessage());
            response.setStatus(404);
        }
    }

    private void getListTour(List<OrderTourDetail> listTour, Tbl_OrderDetailDTO orderDetailDTO) {
        try {
            Tbl_ToursDAO toursDAO = new Tbl_ToursDAO();
            Tbl_ToursDTO toursDTO = toursDAO.getTourDetail(orderDetailDTO.getTourId());

            OrderTourDetail orderTourDetail = new OrderTourDetail(orderDetailDTO.getQuantity(), toursDTO);
            
            listTour.add(orderTourDetail);
        } catch (Exception e) {
            log("ERROR at GetOrderDetail controller: " + e.getMessage());
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
