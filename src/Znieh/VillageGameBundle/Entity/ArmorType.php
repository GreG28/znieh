<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * ArmorType
 *
 * @ORM\Table()
 * @ORM\Entity
 * @ExclusionPolicy("all")
 */
class ArmorType
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Expose
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="ArmorPartType", cascade={"persist"})
     */
    private $parts;

    /**
     * @ORM\ManyToOne(targetEntity="Building", cascade={"persist"})
     */
    private $building;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return ArmorType
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->parts = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add parts
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorPartType $parts
     *
     * @return ArmorType
     */
    public function addPart(\Znieh\VillageGameBundle\Entity\ArmorPartType $parts)
    {
        $this->parts[] = $parts;

        return $this;
    }

    /**
     * Remove parts
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorPartType $parts
     */
    public function removePart(\Znieh\VillageGameBundle\Entity\ArmorPartType $parts)
    {
        $this->parts->removeElement($parts);
    }

    /**
     * Get parts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getParts()
    {
        return $this->parts;
    }

    /**
     * Set building
     *
     * @param \Znieh\VillageGameBundle\Entity\Building $building
     *
     * @return ArmorType
     */
    public function setBuilding(\Znieh\VillageGameBundle\Entity\Building $building = null)
    {
        $this->building = $building;

        return $this;
    }

    /**
     * Get building
     *
     * @return \Znieh\VillageGameBundle\Entity\Building
     */
    public function getBuilding()
    {
        return $this->building;
    }
}
