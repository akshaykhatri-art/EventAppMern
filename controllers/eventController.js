import Event from "../models/eventModel.js";
import jwt from "jsonwebtoken";

const baseUrl = "http://localhost:3000/events/";

export const createEvent = async (req, res) => {
  const userId = req.user._id;
  const emailExists = await Event.exists({ email: req.body.email });

  if (emailExists) {
    return res.status(400).json({ message: "Email is already in use" });
  }

  const eventImages = req.files.map((file) => file.filename);
  const eventBanner = eventImages.length > 0 ? eventImages[0] : null;

  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    organizerName: req.body.organizerName,
    eventBanner: eventBanner,
    eventImages: eventImages,
    displayStatus: req.body.displayStatus,
    createdBy: userId,
  });

  try {
    const newEvent = await event.save();
    const eventUrl = baseUrl + newEvent._id;
    const responseData = {
      eventUrl,
    };
    res.status(201).json(responseData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    console.log("events", event);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this event" });
    }

    event.title = req.body.title;
    event.description = req.body.description;
    event.email = req.body.email;
    event.phone = req.body.phone;
    event.address = req.body.address;
    event.city = req.body.city;
    event.organizerName = req.body.organizerName;
    event.eventBanner = req.body.eventBanner;
    event.eventImages = req.body.eventImages;
    event.displayStatus = req.body.displayStatus;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this event" });
    }

    await Event.deleteOne({ _id: eventId });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
